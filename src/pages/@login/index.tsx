import { GlobalLoader } from '../../components/GlobalLoader'

export const Login = () => {

  // return <GlobalLoader />

  return (
    <>
      <h1>login</h1>

      <button onClick={e => {
        {/* @ts-ignore */}
        if(onTelegramAuth) {
          // window?.onTelegramAuth()
        }
      }}>meow</button>




      <script async src="https://telegram.org/js/telegram-widget.js?22" data-telegram-login="luckydex_bot" data-size="large" data-onauth="onTelegramAuth(user)" data-request-access="write"></script>

      {/*<script async type="text/javascript">*/}
      {/*  function onTelegramAuth(user) {*/}
      {/*  // @ts-ignore*/}
      {/*  alert('Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')');*/}
      {/*}*/}
      {/*</script>*/}
    </>
  )
}

function onTelegramAuth(user: {username: string, first_name: string,
  last_name: string, id: string}) {
  const name = user?.username ? '@' + user?.username : [user?.first_name, user?.last_name].filter(Boolean).join(' ')
  alert(`Logged in as ${name}`)
  // alert(
  //   'Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')'
  // );
}

// <script type='text/javascript'>
//   function onTelegramAuth(user) {

//       // alert(
//       //   'Logged in as ' + user.first_name + ' ' + user.last_name + ' (' + user.id + (user.username ? ', @' + user.username : '') + ')'
//       // );
//     }
//     </script>
