import { View, SafeAreaView, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function Navigation({ state, descriptors, navigation }) {
  return (
    <SafeAreaView >
      <View style={styles.container}>

        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, alignItems: 'center' }}
            >
              <options.tabBarIcon size={25} focused={isFocused} color={isFocused ? '#006EE6' : 'hsla(0,0%,0%, 0.35)'} />
              <Text style={{ color: isFocused ? '#006EE6' : 'hsla(0,0%,0%, 0.35)' }}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopColor: 'hsla(0,0%,0%, 0.35)',
    borderTopWidth: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingBottom: Platform.OS === 'android' ? 10 : 0,
    paddingTop: 10
  },
});