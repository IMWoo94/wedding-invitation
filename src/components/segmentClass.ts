export function segmentClass(selected: boolean) {
  return `rounded-full border px-4 py-2.5 text-[14px] font-medium transition active:scale-[0.98] ${
    selected
      ? 'border-transparent bg-[#0066cc] text-white dark:bg-[#0a84ff]'
      : 'border-[#e0e0e0] bg-white text-[#555555] dark:border-[#3a3a3c] dark:bg-[#1c1c1e] dark:text-[#c7c7cc]'
  }`
}
