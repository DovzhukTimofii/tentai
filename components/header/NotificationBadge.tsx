
interface NotificationBadgeProps {
  count: number;
}

export const NotificationBadge = ({ count }: NotificationBadgeProps) => {
  const displayCount = count > 99 ? '99+' : count;

  return (
    <span
      className="
        w-[26px] h-[14px]
        absolute top-[-2px] right-[-5px]
        bg-[#FF7043]
        text-white
        text-[10px]
        font-semibold
        leading-none
        pr-[4px]
        px-[3px] py-[2px]
        rounded-full
        border-2 border-white
        flex items-center justify-center
        z-10
        select-none
      "
      aria-label={`${count} notifications`}
    >
      {displayCount}
    </span>
  );
};