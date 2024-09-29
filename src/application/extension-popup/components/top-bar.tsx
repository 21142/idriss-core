import { IDRISS_ICON_WITH_TEXT } from 'shared/idriss';
import { IconButton, Toggle } from 'shared/ui';
import {
  EXTENSION_POPUP_ROUTE,
  useExtensionPopup,
  useExtensionSettings,
} from 'shared/extension';

export const TopBar = () => {
  const { extensionSettings, changeExtensionSetting } = useExtensionSettings();
  const extensionPopup = useExtensionPopup();

  const showSettingsButton =
    extensionPopup.currentRoute === EXTENSION_POPUP_ROUTE.HOME;

  return (
    <nav className="flex items-center justify-between bg-white p-2 drop-shadow-sm">
      <a
        href="https://www.idriss.xyz/"
        className="flex items-center justify-center"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img className="h-12" src={IDRISS_ICON_WITH_TEXT} alt="IDriss Logo" />
      </a>
      <div className="flex items-center">
        {showSettingsButton && (
          <IconButton
            className="text-black"
            iconProps={{
              name: 'DotsVerticalIcon',
              size: 24,
            }}
            onClick={() => {
              extensionPopup.navigate(EXTENSION_POPUP_ROUTE.SETTINGS_HOME);
            }}
          />
        )}
        <Toggle
          value={extensionSettings['entire-extension-enabled']}
          onChange={(enabled) => {
            return changeExtensionSetting({
              'entire-extension-enabled': enabled,
            });
          }}
        />
      </div>
    </nav>
  );
};