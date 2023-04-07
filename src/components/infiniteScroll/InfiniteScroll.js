import { useEffect, useRef } from 'react'

const InfiniteScroll = ({ fetcherMore }) => {
  const divRef = useRef()

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        observer.disconnect()
        fetcherMore()
      }
    }, options)
    observer.observe(divRef.current)

    return () => {
      observer.disconnect()
    }
  }, [])
  return <div ref={divRef} />
}

export default InfiniteScroll
