import {
  ONBOARDING_SLIDES,
  OnboardingHeader,
  OnboardingSlide,
  OnboardingSlideItem,
  PaginationPills,
  SplashScreen,
  useOnboardingStore,
} from "@/features/onboarding";
import { useAppStore } from "@/stores/appStore";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ArrowRight } from "lucide-react-native";
import React, { useRef, useState } from "react";
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const setHasSeenOnboarding = useAppStore((s) => s.setHasSeenOnboarding);
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
    setHasSeenOnboarding(true);
    router.replace("/(auth)/sign-in");
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

        <View style={styles.buttonContainer}>
          <Pressable
            onPress={handleNext}
            style={({ pressed }) => [
              styles.buttonWrapper,
              pressed && styles.buttonPressed,
            ]}
          >
            <LinearGradient
              colors={
                isFinalSlide
                  ? ["#0284C7", "#0EA5E9", "#38BDF8"]
                  : ["#3568A0", "#4B85C4", "#69A6E3"]
              }
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={styles.buttonGradient}
            >
              <Text style={styles.buttonText}>
                {isFinalSlide ? "GET STARTED" : "NEXT"}
              </Text>
              <ArrowRight
                size={19}
                color="#FFFFFF"
                strokeWidth={2.4}
                style={styles.arrowIcon}
              />
            </LinearGradient>
          </Pressable>
        </View>
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
  buttonContainer: {
    width: "100%",
    height: 60,
    position: "relative",
  },
  buttonWrapper: {
    width: "100%",
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
    zIndex: 2,
  },
  buttonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.985 }],
  },
  buttonGradient: {
    width: "100%",
    height: 60,
    borderRadius: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  arrowIcon: {
    marginLeft: 8,
  },
});
