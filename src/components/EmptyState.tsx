import { Inbox } from "lucide-react";

const EmptyState = ({ title = "No data found", description = "Try adjusting your filters" }: { title?: string; description?: string }) => (
  <div className="flex flex-col items-center justify-center py-16 text-center">
    <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center mb-4">
      <Inbox className="w-7 h-7 text-muted-foreground" />
    </div>
    <p className="text-foreground font-medium mb-1">{title}</p>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default EmptyState;
