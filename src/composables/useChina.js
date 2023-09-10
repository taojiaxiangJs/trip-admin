import provinces from '@/assets/china/provinces.json'
import cities from '@/assets/china/cities.json'
import areas from '@/assets/china/areas.json'

export default function () {
  const provincesList = ref(provinces)
  const citiesList = ref(cities)
  const areasList = ref(areas)
  const chinaTree = ref([])
  areas.map((e) => {
    e.children.push()
  })
  return {
    provincesList,
    citiesList,
    areasList,
    chinaTree
  }
}
