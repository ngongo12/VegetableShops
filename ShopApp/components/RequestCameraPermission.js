import React from "react";
import { Button, PermissionsAndroid, SafeAreaView, StatusBar, StyleSheet, Text, View } from "react-native";

const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "Yêu cầu quyền truy cập camera",
        message: `Bạn cần cấp quyền truy cập camera để chụp ảnh`,
        buttonNeutral: "Hỏi lại sau",
        buttonNegative: "Từ chối",
        buttonPositive: "Đồng ý"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

export default requestCameraPermission;