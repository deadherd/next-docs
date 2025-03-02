import { getPreviousNext } from "@/lib/markdown";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

export default function Pagination({ pathname }: { pathname: string }) {
  const res = getPreviousNext(pathname);

  return (
    <div className="grid grid-cols-2 flex-grow sm:py-10 py-7 gap-3">
      <div>
        {res.prev && (
          <Link
            className={buttonVariants({
              className:
                "no-underline w-full flex flex-col pl-3 !py-8 !items-start bg-[#d33f1e] text-white rounded-none",
            })}
            href={`/docs${res.prev.href}`}
          >
            <span className="flex items-center text-sm font-subtitle uppercase text-white/50">
              <ChevronLeftIcon className="w-[1rem] h-[1rem] mr-1 -mt-1" />
              Previous
            </span>
            <span className="ml-1 text-xl font-bold font-subtitle">
              {res.prev.title}
            </span>
          </Link>
        )}
      </div>
      <div>
        {res.next && (
          <Link
            className={buttonVariants({
              className:
                "no-underline w-full flex flex-col pr-3 !py-8 !items-end bg-[#d33f1e] text-white rounded-none",
            })}
            href={`/docs${res.next.href}`}
          >
            <span className="flex items-center text-sm font-subtitle uppercase text-white/50">
              Next
              <ChevronRightIcon className="w-[1rem] h-[1rem] ml-1 -mt-1" />
            </span>
            <span className="mr-1 text-xl font-bold font-subtitle">
              {res.next.title}
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
