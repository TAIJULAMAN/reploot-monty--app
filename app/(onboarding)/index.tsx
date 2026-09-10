import React, { useRef, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  NativeSyntheticEvent,
  NativeScrollEvent,
  useWindowDimensions,
  Pressable,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import { ArrowRight } from "lucide-react-native";
import { useAppStore } from "@/stores/appStore";
import {
  ONBOARDING_SLIDES,
  OnboardingSlideItem,
  useOnboardingStore,
  SplashScreen,
  OnboardingHeader,
  PaginationPills,
  OnboardingSlide,
} from "@/features/onboarding";

export default function OnboardingScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();

  const setHasSeenOnboarding = useAppStore((s) => s.setHasSeenOnboarding);
  const {
    currentSlideIndex,
    setSlideIndex,
    isSplashVisible,
    setSplashVisible,
  } = useOnboardingStore();

  const flatListRef = useRef<FlatList<OnboardingSlideItem>>(null);
  const [activePage, setActivePage] = useState(0);

  const isFinalSlide = activePage === ONBOARDING_SLIDES.length - 1;

  // Handle scroll / swipe gesture
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / width);
    if (page !== activePage && page >= 0 && page < ONBOARDING_SLIDES.length) {
      setActivePage(page);
      setSlideIndex(page);
    }
  };

  const scrollToSlide = (index: number) => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch {
      // ignore
    }
    setActivePage(index);
    setSlideIndex(index);
    flatListRef.current?.scrollToIndex({ index, animated: true });
  };

  const handleNext = () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    } catch {
      // ignore
    }

    if (activePage < ONBOARDING_SLIDES.length - 1) {
      scrollToSlide(activePage + 1);
    } else {
      handleCompleteOnboarding();
    }
  };

  const handleSkip = () => {
    // Jump directly to final "TRAIN SMARTER" slide
    scrollToSlide(ONBOARDING_SLIDES.length - 1);
  };

  const handleCompleteOnboarding = () => {
    try {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } catch {
      // ignore
    }
    setHasSeenOnboarding(true);
    router.replace("/(auth)/sign-in");
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* Splash Screen Overlay (Page 2) */}
      {isSplashVisible && (
        <SplashScreen
          onDismiss={() => setSplashVisible(false)}
          autoDismissTimeout={1800}
        />
      )}

      {/* Top Header with Logo & Skip (Pages 3-6) */}
      <OnboardingHeader
        showSkip={!isFinalSlide}
        onSkip={handleSkip}
        onLogoPress={() => setSplashVisible(true)}
      />

      {/* Horizontal Paging Slides */}
      <FlatList
        ref={flatListRef}
        data={ONBOARDING_SLIDES}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <OnboardingSlide slide={item} />}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={16}
        initialScrollIndex={0}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
        style={styles.flatList}
      />

      {/* Bottom Floating Control Bar (HUD Indicators & Gradient Button) */}
      <View
        style={[
          styles.bottomControls,
          { paddingBottom: Math.max(insets.bottom + 16, 28) },
        ]}
        pointerEvents="box-none"
      >
        {/* Pagination Indicator Pills (Hidden on Slide 4 / Final Screen) */}
        {!isFinalSlide ? (
          <PaginationPills
            total={3}
            activeIndex={activePage}
            onSelectIndex={scrollToSlide}
          />
        ) : (
          <View style={styles.paginationSpacer} />
        )}

        {/* Dynamic Action Button (NEXT -> / GET STARTED ->) */}
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
                : ["#2563EB", "#0284C7", "#38BDF8"]
            }
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>
              {isFinalSlide ? "GET STARTED" : "NEXT"}
            </Text>
            <ArrowRight
              size={18}
              color="#FFFFFF"
              strokeWidth={2.5}
              style={styles.arrowIcon}
            />
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#070A11",
  },
  flatList: {
    flex: 1,
  },
  bottomControls: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 24,
    alignItems: "center",
    zIndex: 10,
  },
  paginationSpacer: {
    height: 24,
    marginVertical: 10,
  },
  buttonWrapper: {
    width: "100%",
    height: 56,
    borderRadius: 28,
    overflow: "hidden",
    shadowColor: "#0284C7",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonPressed: {
    opacity: 0.88,
    transform: [{ scale: 0.985 }],
  },
  buttonGradient: {
    width: "100%",
    height: "100%",
    borderRadius: 28,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  arrowIcon: {
    marginLeft: 10,
  },
});
