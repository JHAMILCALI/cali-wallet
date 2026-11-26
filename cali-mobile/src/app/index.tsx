import * as Clipboard from 'expo-clipboard';
import * as IntentLauncher from 'expo-intent-launcher';
import * as Linking from 'expo-linking';
import { Alert, Platform, Pressable, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AnimatedIcon } from '@/components/animated-icon';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';

// Web URLs: if the app is installed, Android/iOS app links open it; otherwise the browser opens.
const MCP_NAME = 'GoldEye';
const MCP_URL = 'https://goldeye-trace-mcp.pinata-server.workers.dev/mcp';

// Claude: this link opens "Add custom connector" with name and URL prefilled (user still confirms).
// ChatGPT has no prefill link, so we copy the URL and open the app; androidPackage must be in the app.json <queries> plugin.
const AI_APPS = [
  {
    name: 'Claude',
    url: `https://claude.ai/customize/connectors?modal=add-custom-connector&connectorName=${encodeURIComponent(MCP_NAME)}&connectorUrl=${encodeURIComponent(MCP_URL)}`,
  },
  { name: 'ChatGPT', url: 'https://chatgpt.com', androidPackage: 'com.openai.chatgpt' },
];

async function launch({ name, url, androidPackage }: (typeof AI_APPS)[number]) {
  try {
    if (Platform.OS === 'android' && androidPackage) {
      IntentLauncher.openApplication(androidPackage);
    } else {
      await Linking.openURL(url);
    }
  } catch {
    Alert.alert('No disponible', `${name} no está instalada o no se pudo abrir`);
  }
}

async function openApp(app: (typeof AI_APPS)[number]) {
  if (!app.androidPackage) return launch(app);
  await Clipboard.setStringAsync(MCP_URL);
  Alert.alert(
    `Conectar ${MCP_NAME} en ${app.name}`,
    `URL del MCP copiada. En ${app.name}: Plugins → Añadir → Add custom MCP server, pon el nombre "${MCP_NAME}" y pega la URL.`,
    [{ text: 'Abrir', onPress: () => launch(app) }]
  );
}

export default function HomeScreen() {
  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <AnimatedIcon />
          <ThemedText type="title" style={styles.title}>
            Cali Wallet
          </ThemedText>
        </ThemedView>

        <ThemedView type="backgroundElement" style={styles.stepContainer}>
          {AI_APPS.map((app) => (
            <Pressable
              key={app.name}
              accessibilityRole="button"
              onPress={() => openApp(app)}
              style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
              <ThemedView type="backgroundSelected" style={styles.buttonInner}>
                <ThemedText type="smallBold">Abrir {app.name}</ThemedText>
              </ThemedView>
            </Pressable>
          ))}
        </ThemedView>

        {Platform.OS === 'web' && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: 'center',
    gap: Spacing.three,
    paddingBottom: BottomTabInset + Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: 'center',
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
  button: {
    borderRadius: Spacing.three,
    overflow: 'hidden',
  },
  buttonInner: {
    alignItems: 'center',
    paddingVertical: Spacing.three,
  },
  pressed: {
    opacity: 0.7,
  },
});
