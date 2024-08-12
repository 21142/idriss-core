import { useMemo, createElement, StrictMode } from 'react';
import NiceModal from '@ebay/nice-modal-react';
import { createRoot } from 'react-dom/client';

import { Final, useLocationInfo } from 'final';
import { ExtensionSettingsProvider } from 'shared/extension';
import { PortalProvider, QueryProvider, TailwindProvider } from 'shared/ui';
import { WalletContextProvider } from 'shared/web3';
import { ErrorBoundary, WithObservabilityScope } from 'shared/observability';
import { TwitterScrapingContextProvider } from 'host/twitter';
import { WarpcastScrapingContextProvider } from 'host/warpcast';
export class Application {
  private constructor() {}

  static run() {
    bootstrap();
  }
}

const bootstrap = () => {
  const root = document.createElement('div');
  const shadowRoot = root.attachShadow({ mode: 'open' });
  const reactRoot = createRoot(shadowRoot);
  reactRoot.render(createElement(ApplicationWithProviders));
  document.body.append(root);
};

const ApplicationWithProviders = () => {
  const { isTwitter, isWarpcast } = useLocationInfo();

  const disabledWalletRdns = useMemo(() => {
    if (isTwitter) {
      return ['coinbase'];
    }
    return [];
  }, [isTwitter]);

  const isExpectedPage = isTwitter || isWarpcast;

  if (!isExpectedPage) {
    return null;
  }

  return (
    <StrictMode>
      <WithObservabilityScope>
        <ErrorBoundary>
          <PortalProvider>
            <TailwindProvider>
              <QueryProvider>
                <NiceModal.Provider>
                  <WalletContextProvider
                    disabledWalletsRdns={disabledWalletRdns}
                  >
                    <ExtensionSettingsProvider>
                      <TwitterScrapingContextProvider>
                        <WarpcastScrapingContextProvider>
                          <Final />
                        </WarpcastScrapingContextProvider>
                      </TwitterScrapingContextProvider>
                    </ExtensionSettingsProvider>
                  </WalletContextProvider>
                </NiceModal.Provider>
              </QueryProvider>
            </TailwindProvider>
          </PortalProvider>
        </ErrorBoundary>
      </WithObservabilityScope>
    </StrictMode>
  );
};
