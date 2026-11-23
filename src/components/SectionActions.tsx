import { Link } from "react-router-dom";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

type SectionActionsProps = {
  detailsTo: string;
  detailsLabel?: string;
  whatsappHref: string;
  whatsappLabel?: string;
  className?: string;
};

export function SectionActions({
  detailsTo,
  detailsLabel = "View full details",
  whatsappHref,
  whatsappLabel = "Book on WhatsApp",
  className = "",
}: SectionActionsProps) {
  return (
    <div className={`mt-6 flex flex-wrap gap-2.5 ${className}`}>
      <Button asChild variant="outline">
        <Link to={detailsTo}>
          {detailsLabel} <ArrowUpRight aria-hidden="true" />
        </Link>
      </Button>
      <Button asChild>
        <a href={whatsappHref} target="_blank" rel="noreferrer">
          <MessageCircle aria-hidden="true" /> {whatsappLabel}
        </a>
      </Button>
    </div>
  );
}
