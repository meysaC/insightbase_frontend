import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { cn } from '@/lib/utils';


export const Message = ({
  className,
  from,
  ...props
}) => (
  <div
    className={cn(
      'group flex w-full items-end justify-end gap-2 py-4',
      from === 'user' 
        ? 'is-user [&>div]:max-w-[70%]' 
        : 'is-assistant flex-row-reverse justify-end [&>div]:max-w-[100%]',
      className
    )}
    {...props} />
);

export const MessageContent = ({
  children,
  className,
  ...props 
}) => (
  <div
    className={cn(
      'flex flex-col gap-2 rounded-lg text-sm text-foreground px-4 py-3 overflow-hidden',
      'group-[.is-user]:bg-primary group-[.is-user]:text-primary-foreground',
      'group-[.is-assistant]:text-foreground',
      className  //group-[.is-assistant]:bg-secondary
    )}
    {...props}>
    <div className="is-user:dark">{children}</div>
  </div>
);

export const MessageAvatar = ({
  src,
  name,
  className,
  ...props
}) => (
  <Avatar className={cn('size-8 ring ring-1 ring-border', className)} {...props}>
    <AvatarImage alt="" className="mt-0 mb-0" src={src} />
    <AvatarFallback>{name?.slice(0, 2) || 'ME'}</AvatarFallback>
  </Avatar>
);
