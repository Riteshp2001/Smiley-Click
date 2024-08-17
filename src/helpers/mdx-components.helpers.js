import { RefreshCw, Save } from 'react-feather';

import Paragraph from '@/components/Paragraph';
import SmallParagraph from '@/components/Paragraph/SmallParagraph';
import PostLink from '@/components/PostLink';
import Link from '@/components/Link';
import Blockquote from '@/components/Blockquote';
import List from '@/components/List';
import ContentHeading from '@/components/ContentHeading';
import Chunk from '@/components/Chunk';
import UnstyledButton from '@/components/UnstyledButton';
import Em from '@/components/Em';
import Me from '@/components/Me';
import Strikethrough from '@/components/Strikethrough';
import Sparkles from '@/components/Sparkles';
import InlineCode from '@/components/InlineCode';
import CodeSnippet from '@/components/CodeSnippet';
import StaticCodeSnippet from '@/components/CodeSnippet/LazyStaticCodeSnippet';
import LiveCodeSnippet from '@/components/CodeSnippet/LazyLiveCodeSnippet';
import Playground from '@/components/Playground';
import ReactPlayground from '@/components/Playground/React';
import Sandbox from '@/components/Sandbox';
import PostImage from '@/components/PostImage';
import ShadowImage from '@/components/PostImage/ShadowImage';
import Asterisk from '@/components/Asterisk';
import Term from '@/components/Term';
import Sidenote from '@/components/Sidenote';
import DesktopOnly from '@/components/DesktopOnly';
import MobileOnly from '@/components/MobileOnly';
import VideoGif from '@/components/VideoGif';
import VideoPlayer from '@/components/VideoPlayer';
import VimeoVideoPlayer from '@/components/VimeoVideoPlayer';
import FullBleed from '@/components/FullBleed';
import FullBleedTutorial from '@/components/FullBleedTutorial/FullBleedTutorialV2';
import InlineSFX from '@/components/InlineSFX';
import SideBySide from '@/components/SideBySide';
import SideBySideCode from '@/components/SideBySideCode';
import DeconstructedPancake from '@/components/DeconstructedPancake';
import BinaryPoll from '@/components/BinaryPoll';
import Table from '@/components/Table';
import BarGraph from '@/components/BarGraph';
import Tweet from '@/components/Tweet';
import FakeTweet from '@/components/FakeTweet';
import TweetGrid from '@/components/TweetGrid';
import Testimonial from '@/components/Testimonial';
import TwitterCTA from '@/components/TwitterCTA';
import Center from '@/components/Center';
import Spacer from '@/components/Spacer';
import Space from '@/components/Space';
import FirefoxOnly from '@/components/Browsers/FirefoxOnly';
import SafariOnly from '@/components/Browsers/SafariOnly';
import ExcludingChrome from '@/components/Browsers/ExcludingChrome';
import ErrorMessage from '@/components/ErrorMessage';
import Divider from '@/components/Divider';
import HorizontalRule from '@/components/HorizontalRule';
import VisuallyHidden from '@/components/VisuallyHidden';
import RelatedPosts from '@/components/RelatedPosts';
import EggheadSplash from '@/components/EggheadSplash';
import CanIUseEmbed from '@/components/CanIUseEmbed';
import YoutubeEmbed from '@/components/YoutubeEmbed';
import CodeSandboxEmbed from '@/components/CodeSandboxEmbed';
import NewsletterSignup from '@/components/NewsletterSignup';
import { NewsletterLinkToPost } from '@/components/Newsletter/raw-components';
import VennDiagram from '@/components/VennDiagram/VennDiagramInPost';
import RenderWhenOnscreen from '@/components/RenderWhenOnscreen';
import SkewedLayers from '@/components/SkewedLayers';
import ImageCompare from '@/components/ImageCompare';
import RawOnly from '@/components/RawOnly';
import EpilepsyWarning from '@/components/EpilepsyWarning';
import CycleTextOnClick from '@/components/CycleTextOnClick';
import ColorPicker from '@/components/ColorPicker/LazyColorPicker';
import DateSpecificText from '@/components/DateSpecificText';
import TimeRemaining from '@/components/TimeRemaining';
import MiniGlowingPlayButton from '@/components/GlowingPlayButton/MiniGlowingPlayButton';

// One-offs
import {
  ButtonGradient,
  ButtonLayers,
  ButtonLayersWithShadow,
  FinalButton,
  FinalButtonRound,
  IntroDemo,
  SoftShadow,
} from '@/post-helpers/3d-button';
import {
  Environment,
  MotionWarning,
  OldBrowserWarning,
  Sandbox as SpringPhysicsSandbox,
  SpringComparison,
  SpringMechanism,
  SpringVsEase,
} from '@/post-helpers/spring-physics-intro';
import {
  BezierGraph,
  BoxAnimation,
  EarlyButton,
  EnteringAndExiting,
} from '@/post-helpers/css-transitions';
import DynamicBezierCurvesMainContent from '@/post-helpers/dynamic-bezier-curves';
import { LogoExplosion } from '@/post-helpers/how-i-built-my-blog';
import {
  HitCounterCodeSamples,
  HitCounterDemo,
  ScreenTriggerer,
} from '@/post-helpers/serverless-hit-counter';
import { BlenderGallery } from '@/post-helpers/how-to-learn-stuff-quickly';
import {
  ButtonDemo,
  SetterDemo,
} from '@/post-helpers/css-variables-for-react-devs';
import {
  ShadowDemo,
  ShadowComparisonDemo,
} from '@/post-helpers/designing-shadows';
import {
  Box,
  FullBleedGrid,
  FullBleedGridWithContent,
  HolyGrail,
} from '@/post-helpers/full-bleed';
import {
  DesignerPerspectiveIllustration,
  LeftAlignDemo,
} from '@/post-helpers/pixel-perfection';
import MarginCollapse from '@/post-helpers/rules-of-margin-collapse';
import {
  EnvelopeDemo,
  EnvelopeLayers,
} from '@/post-helpers/stacking-contexts';
import FloatedGluestick from '@/post-helpers/styled-components/FloatedGluestick';
import { NestedDemo } from '@/post-helpers/css-counters';
import TransformDemo from '@/post-helpers/transforms/TransformDemo';
import { CompressionTable } from '@/post-helpers/embracing-modern-image-formats';
import {
  Demos,
  Initial,
  InitialKeyframe,
  InitialSplit,
  IntervalDemos,
} from '@/post-helpers/animated-sparkles';
import {
  SiteDemo,
  GlugDemo,
  PopsDemo,
  PlayPauseDemo,
  DrumMachineDemo,
  CheckboxDemo,
} from '@/post-helpers/use-sound';
import {
  DoubleIconDemo,
  ShowMoreDemo,
  FancyDemos,
  CircleDemo,
} from '@/post-helpers/boop';
import { OrderOfOperations } from '@/post-helpers/dark-mode';
import { NailPolish } from '@/post-helpers/demystifying-styled-components';
import {
  FoldCodeSnippet,
  FoldingDemo,
  FoldOriginDemo,
  FoldPerspectiveDemo,
  FoldTransformDemo,
  TheTrickDemo,
} from '@/post-helpers/folding-the-dom';
import { HomeButtonSnippet } from '@/post-helpers/modern-spacer-gif';
import { PersistedLiveDemo } from '@/post-helpers/persisting-react-state';
import {
  CasinoLights,
  RainbowDemoButton,
  GradientIdeaImage,
  RainbowButtonOldMethod,
} from '@/post-helpers/rainbow-button';
import { PerilsCulprit } from '@/post-helpers/the-perils-of-rehydration';
import { BoxModelQuiz } from '@/post-helpers/custom-css-reset';
import {
  FadeInDemo,
  ScaleWithPseudoAfter,
  ScaleWithPseudoBefore,
} from '@/components/SnippetBlocks';
import {
  GradientSlider,
  ManuallyCalculateMidpoints,
  RGBColors,
  HSLColors,
} from '@/post-helpers/make-beautiful-gradients';
import { BlocksInline } from '@/post-helpers/understanding-layout-algorithms';
import {
  IntroFileViewerDemo,
  MetaFileViewerDemo,
  HooksFileViewerDemo,
} from '@/post-helpers/file-structure';
import TerminalScreenshot from '@/post-helpers/terminal-for-js-devs/TerminalScreenshot';
import {
  EmDemo,
  RemDemo,
  RemPaddingDemo,
  ButtonWidthDemo,
  VerticalMarginsDemo,
  PxRemComparisonDemo,
} from '@/post-helpers/surprising-truth-about-pixels-and-accessibility';
import { ExpressionHighlighter } from '@/post-helpers/statements-vs-expressions';
import {
  GreenTextFlash,
  CounterNodeGraph,
  CounterDecorationNodeGraph,
  UseMemoGraph,
  DecorativeBoxesNodeGraph,
  PrimeClockGraph,
  PurePrimeClockGraph,
} from '@/post-helpers/why-react-renders';
import { DraggableSnapshots } from '@/post-helpers/usememo-and-usecallback';
import {
  Sandpack,
  SandpackWrapper,
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackActiveFileDemo,
  SandpackCustomRefreshDemo,
} from '@/post-helpers/next-level-playground';
import {
  ArgyleDemo,
  Clippy,
  DirectionSvg,
  FlexVennDiagram,
  WienersDemo,
  SouvlakiDemo,
  GapWarning,
  FlexDemoLayoutMode,
  FlexDemoDirection,
  FlexDemoJustify,
  FlexDemoJustifyAndAlign,
  FlexDemoAlignSelf,
  FlexDemoFlexBasis,
  FlexDemoFlexGrowIntro,
  FlexDemoFlexGrowMultiple,
  FlexDemoShrinkContainer,
  FlexDemoShrinkBasis,
  FlexDemoShrinkProperDemo,
  FlexDemoShrinkSearchField,
  FlexDemoShrinkZero,
  FlexDemoShrinkZeroFixed,
  FlexDemoShrinkWords,
  FlexDemoGapIntro,
  FlexDemoGapHeader,
  FlexDemoAutoMargins,
  FlexDemoWrappingIntro,
  FlexDemoWrappingAlignItems,
} from '@/post-helpers/interactive-guide-to-flexbox';
import {
  GridDemoInitialExample,
  GridDemoImplicitGrid,
  GridDemoImplicitGridFixedHeight,
  GridDemoPercentageVsFraction,
  GridDemoPercentageVsFractionWithGap,
  GridDemoNarrowColumns,
  GridDemoJustifyContent,
  GridDemoJustifyContentMultiRow,
  GridDemoJustifyItems,
  GridDemoJustifyAlign,
  GridDemoTwoLineCenter,
  GridDemoAssignableChildren,
  GridDemoGridLinesGotcha,
  GridDemoCalendar,
  GridDemoGridAreas,
  GridDemoGridAreasLayout,
  GridDemoFullBleed,
} from '@/post-helpers/interactive-guide-to-grid';
import {
  RGBColorPicker,
  HexColorPicker,
  RedContrast,
  LCHColors,
  HSLColors as HSLColorsFromColorFormats,
  LCHColorPicker,
  NamedColorPicker,
  NamedGrays,
} from '@/post-helpers/color-formats';
import { PropTable as DataBindingPropTable } from '@/post-helpers/data-binding-cheatsheet';
import {
  ReassignableVariable,
  LockedVariable,
  MutableFruits,
  MutableObject,
  InfiniteNumberPicker,
} from '@/post-helpers/the-const-deception';
import {
  PrideFlagDemoUnit,
  PrideFlag,
  ColumnRippleDemo,
  GradientBarDemo,
} from '@/post-helpers/pride-flags';
import {
  DivisionGroupsDemo,
  CircularColorsDemo,
} from '@/post-helpers/modulo-operator';
import { ClientServerGraph } from '@/post-helpers/server-components/ClientServerGraphs';
import { ClientServerChart } from '@/post-helpers/server-components/ClientServerChart';
import {
  ApplicationTreeInitial,
  ApplicationTreeWithDirective,
  ApplicationTreeWithBoundary,
} from '@/post-helpers/server-components/ApplicationTrees';
import {
  CenteringAutoMargins,
  CenteringFlexCenter,
  CenteringFlexMulti,
  CenteringFixedPopup,
  CenteringPickTwo,
  CenteringGDPRPopup,
  CenteringUnknownSize,
  CenteringGridTwoLine,
  CenteringGridVsFlexbox,
  CenteringGridIssueExplained,
  CenteringGridStack,
  CenteringTextAlign,
  CenteringFutureAlignContent,
} from '@/post-helpers/center-a-div';
import { CountdownDemo } from '@/post-helpers/promises';
import * as UseDeferredValueComponents from '@/post-helpers/use-deferred-value';

//
//
//
//
//
export const COMPONENTS = {
  p: Paragraph,
  a: ({ type, ...props }) =>
    type === 'original' ? <a {...props} /> : <PostLink {...props} />,
  blockquote: Blockquote,
  ul: (props) => <List type="unordered" {...props} />,
  ol: (props) => <List type="ordered" {...props} />,
  li: List.ListItem,
  i: ({ type, ...props }) =>
    type === 'original' ? <i {...props} /> : <em {...props} />,
  em: ({ type, ...props }) =>
    type === 'original' ? <em {...props} /> : <Em {...props} />,
  strike: Strikethrough,
  img: PostImage,
  inlineCode: InlineCode,
  code: CodeSnippet,
  h1: (props) => <ContentHeading type="major-heading" {...props} />,
  h2: (props) => <ContentHeading type="normal-heading" {...props} />,
  h3: (props) => <ContentHeading type="minor-heading" {...props} />,
  hr: HorizontalRule,
  center: Center,
  SmallParagraph,
  RelatedPosts,
  Asterisk,
  Term,
  Sidenote,
  Aside: Sidenote,
  Spacer,
  Space,
  FirefoxOnly,
  SafariOnly,
  ExcludingChrome,
  ErrorMessage,
  Divider,
  HorizontalRule,
  Me,
  VideoGif,
  VideoPlayer,
  VimeoVideoPlayer,
  FullBleed,
  FullBleedTutorial,
  VisuallyHidden,
  Paragraph,
  Link,
  PostLink,
  Blockquote,
  Chunk,
  UnstyledButton,
  List,
  ListItem: List.ListItem,
  Em,
  Sparkles,
  PostImage,
  ShadowImage,
  InlineCode,
  CodeSnippet,
  LiveCodeSnippet,
  StaticCodeSnippet,
  Playground,
  ReactPlayground,
  Sandbox,
  ContentHeading,
  InlineSFX,
  SideBySide,
  SideBySideCode,
  DeconstructedPancake,
  BinaryPoll,
  Table,
  BarGraph,
  Tweet,
  FakeTweet,
  TweetGrid,
  Testimonial,
  EggheadSplash,
  CanIUseEmbed,
  YoutubeEmbed,
  CodeSandboxEmbed,
  NewsletterSignup,
  NewsletterLinkToPost,
  VennDiagram,
  TwitterCTA,
  DesktopOnly,
  MobileOnly,
  SkewedLayers,
  ImageCompare,
  RawOnly,
  EpilepsyWarning,
  RenderWhenOnscreen,
  CycleTextOnClick,
  ColorPicker,
  DateSpecificText,
  TimeRemaining,
  MiniGlowingPlayButton,

  // Icons
  RefreshCw,
  Save,

  // In the "Raw" email views, <SubscriberGreeting> emits a big ol'
  // merge tag. In the non-raw version (the rest of the site),
  // it should just render the fallback.
  SubscriberGreeting: ({ fallback }) => (
    <Paragraph>{fallback}</Paragraph>
  ),

  // One-offs
  ButtonGradient,
  ButtonLayers,
  ButtonLayersWithShadow,
  FinalButton,
  FinalButtonRound,
  IntroDemo,
  SoftShadow,
  Environment,
  MotionWarning,
  OldBrowserWarning,
  SpringPhysicsSandbox,
  SpringComparison,
  SpringMechanism,
  SpringVsEase,
  BezierGraph,
  BoxAnimation,
  EarlyButton,
  EnteringAndExiting,
  DynamicBezierCurvesMainContent,
  LogoExplosion,
  HitCounterCodeSamples,
  HitCounterDemo,
  ScreenTriggerer,
  BlenderGallery,
  ButtonDemo,
  SetterDemo,
  ShadowDemo,
  ShadowComparisonDemo,
  Box,
  FullBleedGrid,
  FullBleedGridWithContent,
  HolyGrail,
  DesignerPerspectiveIllustration,
  LeftAlignDemo,
  MarginCollapse,
  EnvelopeDemo,
  EnvelopeLayers,
  FloatedGluestick,
  NestedDemo,
  TransformDemo,
  CompressionTable,
  Demos,
  Initial,
  InitialKeyframe,
  InitialSplit,
  IntervalDemos,
  SiteDemo,
  GlugDemo,
  PopsDemo,
  PlayPauseDemo,
  DrumMachineDemo,
  CheckboxDemo,
  DoubleIconDemo,
  ShowMoreDemo,
  FancyDemos,
  CircleDemo,
  OrderOfOperations,
  NailPolish,
  FoldCodeSnippet,
  FoldingDemo,
  FoldOriginDemo,
  FoldPerspectiveDemo,
  FoldTransformDemo,
  TheTrickDemo,
  HomeButtonSnippet,
  PersistedLiveDemo,
  CasinoLights,
  RainbowDemoButton,
  GradientIdeaImage,
  RainbowButtonOldMethod,
  PerilsCulprit,
  BoxModelQuiz,
  FadeInDemo,
  ScaleWithPseudoAfter,
  ScaleWithPseudoBefore,
  GradientSlider,
  ManuallyCalculateMidpoints,
  RGBColors,
  HSLColors,
  BlocksInline,
  IntroFileViewerDemo,
  MetaFileViewerDemo,
  HooksFileViewerDemo,
  TerminalScreenshot,
  EmDemo,
  RemDemo,
  RemPaddingDemo,
  ButtonWidthDemo,
  VerticalMarginsDemo,
  PxRemComparisonDemo,
  ExpressionHighlighter,
  CounterNodeGraph,
  CounterDecorationNodeGraph,
  UseMemoGraph,
  DecorativeBoxesNodeGraph,
  PrimeClockGraph,
  PurePrimeClockGraph,
  GreenTextFlash,
  DraggableSnapshots,
  Sandpack,
  SandpackWrapper,
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackActiveFileDemo,
  SandpackCustomRefreshDemo,
  ArgyleDemo,
  Clippy,
  DirectionSvg,
  FlexVennDiagram,
  WienersDemo,
  SouvlakiDemo,
  GapWarning,
  FlexDemoLayoutMode,
  FlexDemoDirection,
  FlexDemoJustify,
  FlexDemoJustifyAndAlign,
  FlexDemoAlignSelf,
  FlexDemoFlexBasis,
  FlexDemoFlexGrowIntro,
  FlexDemoFlexGrowMultiple,
  FlexDemoShrinkContainer,
  FlexDemoShrinkBasis,
  FlexDemoShrinkProperDemo,
  FlexDemoShrinkSearchField,
  FlexDemoShrinkZero,
  FlexDemoShrinkZeroFixed,
  FlexDemoShrinkWords,
  FlexDemoGapIntro,
  FlexDemoGapHeader,
  FlexDemoAutoMargins,
  FlexDemoWrappingIntro,
  FlexDemoWrappingAlignItems,
  GridDemoInitialExample,
  GridDemoImplicitGrid,
  GridDemoImplicitGridFixedHeight,
  GridDemoPercentageVsFraction,
  GridDemoPercentageVsFractionWithGap,
  GridDemoNarrowColumns,
  GridDemoJustifyContent,
  GridDemoJustifyContentMultiRow,
  GridDemoJustifyItems,
  GridDemoJustifyAlign,
  GridDemoTwoLineCenter,
  GridDemoAssignableChildren,
  GridDemoGridLinesGotcha,
  GridDemoCalendar,
  GridDemoGridAreas,
  GridDemoGridAreasLayout,
  GridDemoFullBleed,
  RGBColorPicker,
  HexColorPicker,
  RedContrast,
  LCHColors,
  HSLColorsFromColorFormats,
  LCHColorPicker,
  NamedColorPicker,
  NamedGrays,
  DataBindingPropTable,
  ReassignableVariable,
  LockedVariable,
  MutableFruits,
  MutableObject,
  InfiniteNumberPicker,
  PrideFlagDemoUnit,
  PrideFlag,
  ColumnRippleDemo,
  GradientBarDemo,
  DivisionGroupsDemo,
  CircularColorsDemo,
  ClientServerGraph,
  ClientServerChart,
  ApplicationTreeInitial,
  ApplicationTreeWithDirective,
  ApplicationTreeWithBoundary,
  CenteringAutoMargins,
  CenteringFlexCenter,
  CenteringFlexMulti,
  CenteringFixedPopup,
  CenteringPickTwo,
  CenteringGDPRPopup,
  CenteringUnknownSize,
  CenteringGridTwoLine,
  CenteringGridVsFlexbox,
  CenteringGridIssueExplained,
  CenteringGridStack,
  CenteringTextAlign,
  CenteringFutureAlignContent,
  CountdownDemo,
  ...UseDeferredValueComponents,
};
