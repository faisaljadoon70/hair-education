import { headers } from 'next/headers'

export function DeviceMetaTags() {
  const headersList = headers()
  
  return (
    <>
      <meta name="x-device-type" content={headersList.get('x-device-type') || 'desktop'} />
      <meta name="viewport" content={headersList.get('x-viewport') || 'width=device-width, initial-scale=1'} />
    </>
  )
}
