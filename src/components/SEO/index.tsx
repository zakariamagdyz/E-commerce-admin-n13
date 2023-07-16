import { NextSeo, SocialProfileJsonLd } from "next-seo"

const SEO = () => (
  <>
    <NextSeo
      description="Islem Maboud Protoflio"
      openGraph={{
        images: [
          {
            url: "http://islemmaboud.vercel.app/images/og.png",
            width: 1200,
            height: 630,
            alt: "Islem Maboud",
            type: "image/png",
            secureUrl: "https://islemmaboud.vercel.app/images/og.png",
          },
        ],
      }}
    />
    {/* specific format to help google engin to scrawl your website easily   */}
    <SocialProfileJsonLd
      type="Person"
      name="Islem Maboud"
      url="https://islemmaboud.vercel.app/"
      sameAs={[
        "https://www.facebook.com/islem.maboud",
        "https://www.instagram.com/islemmaboud/",
        "https://www.linkedin.com/in/islem-maboud/",
      ]}
    />
  </>
)

function Index() {
  return (
    <>
      <SEO />
      <h1>Islem Maboud</h1>
    </>
  )
}

export default Index
