import Banner from '@/components/Banner'
import BestSeller from '@/components/BestSeller'
import LatestCollection from '@/components/LatestCollection'
import NewsLetterBox from '@/components/NewsLetterBox'
import OurPolicy from '@/components/OurPolicy'

const Home = () => {
   
  return (
    <div>
     <Banner />
     <LatestCollection />
     <BestSeller />
     <OurPolicy />
     <NewsLetterBox />

    </div>
  )
}

export default Home