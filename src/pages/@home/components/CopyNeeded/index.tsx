import { useEffect } from "react"
import copy from 'copy-to-clipboard';

// @ts-ignore
window.__list = ''

export const CopyNeeded = ({list}: {list: string[]}) => {
  const platform = 'web'

  useEffect(() => {
    // @ts-ignore
    window.__list = list.join(',')
  }, [list])


  useEffect(() => {
    Telegram.WebApp.MainButton.setText('Copy search string')
    // @ts-ignore
    Telegram.WebApp.MainButton.show()
    // @ts-ignore
    Telegram.WebApp.onEvent('mainButtonClicked', () => {
      // DemoApp.sendMessage('text')
      // @ts-ignore
      copy(window.__list);

      Telegram.WebApp.MainButton.setText('Copied')
      Telegram.WebApp.MainButton.color = "#35cc24"

      setTimeout(() => {
        Telegram.WebApp.MainButton.setText('Copy search string')
        Telegram.WebApp.MainButton.color = "#2481cc"
      }, 1000)
    })
  }, [])


  return <></>
  // return <><button>Copy</button></>
}
