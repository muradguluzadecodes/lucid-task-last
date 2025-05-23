export function stripFirstTwoTokens(str: string): string {
  return (
    str
      .replace(/\{([^}]+)\}/g, (_: string, inner: string) => {
        const parts = inner.trim().split(/\s+/);
        const restParts = parts.slice(2); // drop first two
        const restJoined = restParts.join(" "); // "20 + 40" or "90"
        const noSpaces = restJoined.replace(/\s+/g, ""); // "20+40" or "90"
        return noSpaces;
      })
      // 2) Remove any leftover parens:
      .replace(/[()]/g, "")
  );
}
