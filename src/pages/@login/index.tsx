export const Login = () => {
  return (
    <>
      <h1>login</h1>

      <button onClick={window.onTelegramAuth}></button>

      <script
        async
        src="https://telegram.org/js/telegram-widget.js?22"
        // @ts-ignore
        dataTelegramLogin="luckydex_bot"
        dataSize="large"
        dataOnauth="onTelegramAuth(user)"
        dataRequestAccess="write"
      />
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
