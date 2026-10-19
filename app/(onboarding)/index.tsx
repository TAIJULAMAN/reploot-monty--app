import {
  ONBOARDING_SLIDES,
  OnboardingButton,
  OnboardingHeader,
  OnboardingSlide,
  OnboardingSlideItem,
  PaginationPills,
  SplashScreen,
  useOnboardingStore,
} from "@/features/onboarding";
import { useAppDispatch } from "@/store/hooks";
import { setHasSeenOnboarding } from "@/store/slices/appSlice";
import * as Haptics from "expo-haptics";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useRef, useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const dispatch = useAppDispatch();
  const { setSlideIndex, isSplashVisible, setSplashVisible } =
    useOnboardingStore();

  const flatListRef = useRef<FlatList<OnboardingSlideItem>>(null);
  const [activePage, setActivePage] = useState(0);
  const isFinalSlide = activePage === ONBOARDING_SLIDES.length - 1;

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / width);
    if (page !== activePage && page >= 0 && page < ONBOARDING_SLIDES.length) {
      setActivePage(page);
      setSlideIndex(page);
    }
  };

  const scrollToSlide = (index: number) => {
    setActivePage(index);
    setSlideIndex(index);
    flatListRef.current?.scrollToIndex({ index, animated: true });
    requestAnimationFrame(() => {
      try {
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      } catch {}
    });
  };

  const handleNext = () => {
    if (activePage < ONBOARDING_SLIDES.length - 1) {
      scrollToSlide(activePage + 1);
    } else {
      handleCompleteOnboarding();
    }
    requestAnimationFrame(() => {
      try {
        void Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      } catch {
        // ignore
      }
    });
  };

  const handleSkip = () => {
    scrollToSlide(ONBOARDING_SLIDES.length - 1);
  };

  const handleCompleteOnboarding = () => {
    dispatch(setHasSeenOnboarding(true));
    router.replace("/sign-up" as any);
    requestAnimationFrame(() => {
      try {
        void Haptics.notificationAsync(
          Haptics.NotificationFeedbackType.Success,
        );
      } catch {
        // ignore
      }
    });
  };

  const renderSlideItem = React.useCallback(
    ({ item }: { item: OnboardingSlideItem }) => (
      <OnboardingSlide slide={item} />
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {isSplashVisible && (
        <SplashScreen
          onDismiss={() => setSplashVisible(false)}
          autoDismissTimeout={1800}
        />
      )}
      <OnboardingHeader
        showSkip={!isFinalSlide}
        onSkip={handleSkip}
        onLogoPress={() => setSplashVisible(true)}
      />
      <FlatList
        ref={flatListRef}
        data={ONBOARDING_SLIDES}
        keyExtractor={(item) => item.id}
        renderItem={renderSlideItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
        initialScrollIndex={0}
        windowSize={3}
        maxToRenderPerBatch={2}
        initialNumToRender={2}
        removeClippedSubviews={true}
        updateCellsBatchingPeriod={50}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        style={styles.flatList}
      />
      <View
        style={[
          styles.bottomControls,
          { bottom: insets.bottom > 0 ? Math.max(insets.bottom + 32, 64) : 64 },
        ]}
        pointerEvents="box-none"
      >
        {!isFinalSlide ? (
          <View style={styles.paginationWrapper}>
            <PaginationPills
              total={3}
              activeIndex={activePage}
              onSelectIndex={scrollToSlide}
            />
          </View>
        ) : (
          <View style={styles.paginationSpacer} />
        )}

        <OnboardingButton isFinalSlide={isFinalSlide} onPress={handleNext} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#11131E",
  },
  flatList: {
    flex: 1,
  },
  bottomControls: {
    position: "absolute",
    left: 20,
    right: 20,
    zIndex: 10,
  },
  paginationWrapper: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 48,
  },
  paginationSpacer: {
    height: 4,
    marginBottom: 48,
  },
});
