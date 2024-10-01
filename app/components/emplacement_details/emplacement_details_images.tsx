import * as React from "react";
import { Dimensions, Text, View } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
    ICarouselInstance,
    Pagination,
} from "react-native-reanimated-carousel";

const data = [...new Array(6).keys()];
const width = Dimensions.get("window").width;

export default function EmplacementDetailsImages() {
  const carouselRef = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const onPressPagination = (index: number) => {
    carouselRef.current?.scrollTo({
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View style={{ alignItems: "center", height: width / 2 + 20 }}>
        <Carousel
          ref={carouselRef}
          width={width}
          height={width / 2}
          data={data}
          onProgressChange={(offsetProgress: number, absoluteProgress: number) => {
            progress.value = absoluteProgress;
          }}
          renderItem={({ index }) => (
            <View
              style={{
                flex: 1,
                borderWidth: 1,
                justifyContent: "center",
              }}
            >
              <Text style={{ textAlign: "center", fontSize: 30 }}>{index}</Text>
            </View>
          )}
        />
        <Pagination.Basic
          progress={progress}
          data={data}
          dotStyle={{ backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 50 }}
          containerStyle={{ gap: 5, marginTop:0}} // Ajustez le marginTop pour coller la pagination au carousel
          onPress={onPressPagination}
        />
      </View>
    </View>
  );
}