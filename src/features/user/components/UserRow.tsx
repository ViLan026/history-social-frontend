import Avatar from "@/components/ui/Avatar";
import { Link } from "lucide-react";


interface UserRowProps {
  id: string;
  displayName?: string;
  email: string;
  avatarUrl?: string | null;
  onFollow: (id: string) => void;
}

export default function UserRow({
  id,
  displayName,
  email,
  avatarUrl,
  onFollow,
}: UserRowProps) {

  return (
    <div className="flex items-center gap-3 group ">
      {/* Avatar + name */}
      <Link
        href={`/profile/${id}`}
        className="
          flex items-center gap-3 flex-1 min-w-0
          rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
        "
      >
        <Avatar avatarUrl={avatarUrl} displayName={displayName} />

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p
            className="
              text-sm font-medium leading-tight text-foreground
              group-hover:text-primary
              truncate transition-colors duration-150
            "
          >
            {displayName}
          </p>
          <p className="text-xs text-foreground-faint truncate mt-0.5">
            {email}
          </p>
        </div>
      </Link>

      {/* Follow button */}
      <button
        onClick={() => onFollow(id)}
        aria-label={`Theo dõi ${displayName}`}
        className="
          shrink-0 px-3 py-1.5 rounded-lg
          text-xs font-medium
          text-primary border border-primary/40
          hover:bg-primary-subtle hover:border-primary/70
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring
          transition-all duration-150
        "
      >
        Theo dõi
      </button>
    </div>
  );
}