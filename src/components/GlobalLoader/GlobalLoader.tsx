type GlobalLoaderProps = {
  visible?: boolean
}

export const GlobalLoader = ({ visible = false }) => {
  return (
    <div className='global-loader'>
      <div className='gbc'>
        <input id='powerSwitch' checked aria-label='Toggle Gameboy power' className='gbc-power-control'
               type='checkbox' />
        <label htmlFor='powerSwitch' className='gbc-power-label'>
          <div className='gbc-power-label-lines'>
            <div className='gbc-power-label-line gbc-power-label-line-1' />
            <div className='gbc-power-label-line gbc-power-label-line-2' />
            <div className='gbc-power-label-line gbc-power-label-line-3' />
          </div>
        </label>
        <div className='gbc-body'>
          <div className='gbc-screen-wrap'>
            <div className='gbc-screen-light' />
            <div className='gbc-screen'>
              <div className='pika-wrap'>
                <div className='pika'>
                  <div className='pika-head'>
                    <div className='pika-face'>
                      <div className='pika-eye pika-eye-left' />
                      <div className='pika-eye pika-eye-right' />
                      <div className='pika-nose' />
                      <div className='pika-mouth'>
                        <div className='pika-mouth-3' />
                        <div className='pika-mouth-inner' />
                      </div>
                      <div className='pika-cheek pika-cheek-left' />
                      <div className='pika-cheek pika-cheek-right' />
                    </div>
                    <div className='pika-ear pika-ear-left' />
                    <div className='pika-ear pika-ear-right' />
                  </div>
                  <div className='pika-body'>
                    <div className='pika-torso' />
                    <div className='pika-arm pika-arm-left'>
                      <div className='pika-arm-fingers' />
                      <div className='pika-arm-shadow' />
                    </div>
                    <div className='pika-arm pika-arm-right'>
                      <div className='pika-arm-fingers' />
                      <div className='pika-arm-shadow' />
                    </div>
                    <div className='pika-tail pika-tail-1'>
                      <div className='pika-tail pika-tail-2'>
                        <div className='pika-tail pika-tail-3' />
                      </div>
                    </div>
                  </div>
                  <div className='pika-bubble' style={{ fontSize: '1.5em', lineHeight: '1.5' }}>Loading...</div>
                  {/*<div className='pika-bubble'>Pika!</div>*/}
                </div>
              </div>
            </div>
          </div>
          <div className='gbc-controls'>
            <div className='gbc-dpad' />
            <div className='gbc-button gbc-button-a' />
            <div className='gbc-button gbc-button-b' />
            <div className='gbc-pill gbc-pill-start' />
            <div className='gbc-pill gbc-pill-select' />
          </div>
        </div>
      </div>
    </div>
  )
}