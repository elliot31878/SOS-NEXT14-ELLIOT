import { useParams, usePathname, useSearchParams } from "next/navigation";
import qs from "query-string";

export function useLocation<TState = undefined, TParams = undefined>(
  searchData?: string[]
): {
  pathname: string;
  params: TParams extends undefined ? Record<string, any> : TParams;
  state: TState extends undefined ? Record<string, any> : TState;
  hash?: string;
  searchObj: Record<string, string | null>;
} {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const params = useParams() as TParams extends undefined
    ? Record<string, any>
    : TParams;
  const storageState = qs.parse(window?.localStorage?.getItem("STATE") || "");
  const state = qs.parse(
    window?.history.state?.uniState ?? ""
  ) as TState extends undefined ? Record<string, any> : TState;
  const hash = window?.location.hash;

  const searchObj: Record<string, string | null> = {};

  const windowSearchParams = new URLSearchParams(window?.location.search);
  windowSearchParams.forEach((value, key) => {
    searchObj[key] = value;
  });

  if (searchData) {
    searchData.forEach((key) => {
      searchObj[key] = searchParams.get(key);
    });
  }

  return {
    searchObj,
    pathname,
    params,
    state: { ...state, ...storageState },
    hash,
  };
}
