import { View as RNView, ScrollView as RNScrollView} from 'react-native'
import { styled } from 'nativewind'

export const View = styled( RNView, { baseClassName: "box-border" } )
export const ScrollView = styled( RNScrollView, { baseClassName: "box-border" })
