import { usePathname, useRouter } from "next/navigation";
import qs from "query-string";
import { matchRoutesFunc } from "./useMatch";

export function useNavigate<TParams = any, TState = any>() {
  const router = useRouter();
  const pathname = usePathname();

  interface NavigateOptions {
    replace?: boolean;
    search?: TParams extends Record<
      string,
      string | number | boolean | undefined
    >
      ? TParams
      : undefined;
    state?: TState extends Record<string, string | number | boolean | undefined>
      ? TState
      : undefined;
    hash?: string;
    isDirty?: boolean;
    safePathName?: string;
  }

  const goTo = ({
    replace,
    url,
    to,
  }: {
    to?: string | -1;
    replace: boolean;
    url: string;
  }) => {
    if (to === -1) {
      router.back();
      return;
    }
    if (replace) {
      router.replace(url);
    } else {
      router.push(url, {});
    }
  };

  /**
   * Navigates to the specified URL with optional options.
   * @param to - The destination URL.
   * @param options - Navigation options (replace, search, state, hash).
   */
  return function (
    to?: string | -1,
    {
      replace = false,
      search,
      state,
      hash,
      isDirty,
      safePathName,
    }: NavigateOptions = {}
  ): void {
    if (to === window.location.pathname) return;
    const cleanSearch = Object.fromEntries(
      Object.entries(search || {}).filter(
        ([_, value]) => value !== null && value !== undefined && value !== ""
      )
    );
    const queryString =
      Object.keys(cleanSearch).length !== 0
        ? `?${qs.stringify(cleanSearch)}`
        : "";
    const hashString = hash ? `#${hash?.replaceAll("#", "")}` : "";
    const url = `${to ?? pathname}${queryString}${hashString}`;

    window.localStorage?.removeItem("STATE");
    if (state) {
      window.localStorage?.setItem(
        "STATE",
        qs.stringify({ ...state, ...window.history.state.uniState })
      );
    }

    if (isDirty) {
      if (
        safePathName &&
        matchRoutesFunc([pathname], { location: safePathName })
      ) {
        goTo({ replace, url, to });
      }
    } else {
      goTo({ replace, url, to });
    }
  };
}
