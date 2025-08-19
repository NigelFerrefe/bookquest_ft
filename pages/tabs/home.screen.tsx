import FirstWishlist from "@/components/pages/tabs/firstWishlist"
import HeroImage from "@/components/pages/tabs/heroImage"
import { ScrollView } from "tamagui"


const HomeScreen = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
        <HeroImage />
        <FirstWishlist />
    </ScrollView>
  )
}

export default HomeScreen