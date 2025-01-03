import { GradientBorder } from '@idriss-xyz/ui/gradient-border';
import { classes } from '@idriss-xyz/ui/utils';
import { ReactNode } from 'react';

type Properties = {
  icon: ReactNode;
  title: string;
  description?: string;
};

export const ProductInfo = ({ icon, title, description }: Properties) => {
  return (
    <div
      className={classes(
        'relative flex items-center gap-4 rounded-[24px] bg-[rgba(255,255,255,0.10)] p-4 shadow-[0_0_0_6px_rgba(255,255,255,0.08)]',
        'md:h-full md:max-w-[384px]',
        '2xl:max-w-[354px]',
      )}
    >
      <div className="flex items-center justify-center gap-2 rounded-[24px] border-[0.765px] border-[rgba(85,235,60,0.30)] bg-[radial-gradient(50%_50%_at_50%_50%,_rgba(252,_255,_242,_0)_0%,_rgba(23,_255,_74,_0.18)_100%)] p-6">
        {icon}
      </div>
      <div className="flex flex-1 flex-col items-start justify-center gap-2">
        <span
          className={classes(
            'text-heading6 text-midnightGreen-100',
            'lg:text-heading5',
          )}
        >
          {title}
        </span>
        <span className={classes('text-body5 text-mint-200', 'lg:text-body4')}>
          {description}
        </span>
      </div>
      <GradientBorder
        borderRadius={24}
        borderWidth={1}
        gradientDirection="toBottom"
        gradientStartColor="rgba(210,248,93,0.4)"
        gradientStopColor="rgba(255,255,255,0.03)"
      />
    </div>
  );
};
