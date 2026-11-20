import { Link } from "react-router-dom";
import { ArrowUpRight, Phone } from "lucide-react";
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
    <div className={`mt-5 flex flex-wrap gap-3 ${className}`}>
      <Button asChild variant="outline" className="min-h-11 rounded-sm">
        <Link to={detailsTo}>
          {detailsLabel} <ArrowUpRight aria-hidden="true" />
        </Link>
      </Button>
      <Button asChild className="min-h-11 rounded-sm">
        <a href={whatsappHref} target="_blank" rel="noreferrer">
          <Phone aria-hidden="true" /> {whatsappLabel}
        </a>
      </Button>
    </div>
  );
}
