import { StyleProp } from "react-native";
import { ViewStyle } from "react-native";
import { View } from "react-native";
import { Pressable, StyleSheet } from "react-native";

interface PressableButtonProps {
    pressedHandler: () => void;
    pressedInHandler?: () => void;
    pressedStyle?: StyleProp<ViewStyle>;
    children: React.ReactNode;
    componentStyle?: StyleProp<ViewStyle>;
  }
  
  function PressableButton({children, pressedHandler, pressedStyle, componentStyle}:
  PressableButtonProps){
  
  return (
    <Pressable onPress={pressedHandler} style={({pressed}) => [
        styles.default, 
        componentStyle,
        pressed && styles.defaultPressed, 
        pressed && pressedStyle,
    ]}>
      <View>
        {children}
      </View>
      </Pressable>
   );
  }

  const styles = StyleSheet.create({
    default: {
      backgroundColor: 'dimgrey',
    },
    defaultPressed: {
      opacity: 0.5,
    }
  })
  export default PressableButton;