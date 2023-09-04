
const PascalRJ = 398511770;
const Akceptor = 129867229
const KillDron = 1287161713

export const showMainPage = (): boolean => {
  if(window.location.hostname === 'localhost') return true

  const tid: number = Telegram?.WebApp?.initDataUnsafe?.user?.id || 0;
  return [PascalRJ, Akceptor, KillDron].includes(tid)
}