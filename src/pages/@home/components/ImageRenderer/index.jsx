import React, { useRef, useState } from 'react'
import classnames from 'classnames'
import { useIntersection } from './intersectionObserver'
import './styles.css'

export const ImageRenderer = ({ url, thumb, width, height, altLabel }) => {
  const [isError, setIsError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isInView, setIsInView] = useState(false)
  const imgRef = useRef()
  useIntersection(imgRef, () => {
    setIsInView(true)
  })

  const handleOnLoad = () => {
    setIsLoaded(true)
  }
  const handleOnError = () => {
    setIsError(true)
  }
  return (
    <div
      className="image-container"
      ref={imgRef}
      style={{
        paddingBottom: `${(height / width) * 100}%`,
        width: '100%',
      }}>
      {isInView && (
        <>
          <img
            className={classnames('image', 'thumb', {
              ['isLoaded']: !!isLoaded,
              ['isError']: !!isError,
            })}
            src={thumb}
          />
          <img

            className={classnames('image', {
              ['isLoaded']: !!isLoaded,
              ['isError']: !!isError,
            })}
            src={url}
            onLoad={handleOnLoad}
            onError={handleOnError}
          />
          <div className={classnames('image', {
            ['unreleased']: !!isError,
          })}>
            {altLabel}
            {/*<br/>unreleased*/}
          </div>
        </>
      )}
    </div>
  )
}

