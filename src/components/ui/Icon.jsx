import * as Icons from 'lucide-react';

export default function Icon({ name, className = 'w-5 h-5', ...props }) {
  const LucideIcon = Icons[name];
  if (!LucideIcon) return null;
  return <LucideIcon className={className} aria-hidden="true" {...props} />;
}
