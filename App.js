/*
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  const [hasPermission, setHasPermission] = useState(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await MediaLibrary.requestPermissionsAsync();
      setHasPermission(cameraStatus.status === 'granted');
    })();
  }, [])

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        flashMode={flash}
        ref={cameraRef}
      >
        <Text>hello</Text>
      </Camera>
      <View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1, //full window
    borderRadius: 20,

  },
});

*/
import React from "react";
import { View } from "react-native";
import Expo from "expo";
import { Mesh, MeshBasicMaterial, PerspectiveCamera, BoxGeometry } from "three";
import ExpoTHREE, { Renderer } from "expo-three";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { StatusBar } from "expo-status-bar";
import { SphereGeometry } from "three/src/geometries/SphereGeometry";

const App = () => {
  let scene; // Declare the scene variable

  const onContextCreate = async (gl) => {
    // three.js implementation.
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000); // Set background color to black

    const camera = new PerspectiveCamera(
      75,
      gl.drawingBufferWidth / gl.drawingBufferHeight,
      0.1,
      1000
    );
    gl.canvas = {
      width: gl.drawingBufferWidth,
      height: gl.drawingBufferHeight,
    };

    // Set camera position away from the sphere
    camera.position.z = 58;

    const renderer = new Renderer({ gl });
    // Set size of buffer to be equal to drawing buffer width
    renderer.setSize(gl.drawingBufferWidth, gl.drawingBufferHeight);

    // Create sphere
    const geometry = new SphereGeometry(15, 32, 16);
    const material = new MeshBasicMaterial({
      color: 0xFF66AA, // Pink color
      wireframe: true,
      wireframeLinewidth: 2,
    });

    const sphere = new Mesh(geometry, material);

    // Add sphere to scene
    scene.add(sphere);

    // Create render function
    const render = () => {
      requestAnimationFrame(render);
      // Create rotate functionality
      // Rotate around x axis
      sphere.rotation.x += 0.0001;

      // Rotate around y axis
      sphere.rotation.y += 0.004;

      renderer.render(scene, camera);
      gl.endFrameEXP();
    };
    const pointLight = new THREE.PointLight(0xffffff)
    pointLight.position.set(5,5,5)

    const ambientLight = new THREE.AmbientLight(0xffffff)
    scene.add(pointLight, ambientLight)

    // Call render
    render();

    function addStar() {
      const geometry = new THREE.SphereGeometry(0.35);
      const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
      const star = new THREE.Mesh(geometry, material);

      const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
      star.position.set(x, y, z);
      scene.add(star);
    }
    Array(200).fill().forEach(addStar);
  };

  return (
    <View style={{ flex: 1 }}>
      <GLView
        onContextCreate={onContextCreate}
        style={{ flex: 1 }}
      />
      <StatusBar style="auto" />
    </View>
  );
};

export default App;

/*
import React, { useRef, useEffect } from "react";
import { View } from "react-native";
import { GLView } from "expo-gl";
import { Renderer, Scene, PerspectiveCamera, SphereGeometry, Mesh, MeshStandardMaterial, TextureLoader } from "three";
import { StatusBar } from "expo-status-bar";
import { Asset } from "expo-asset";

const App = () => {
  const glViewRef = useRef(null);
  const scene = useRef(null);
  const camera = useRef(null);
  const moon = useRef(null);

  useEffect(() => {
    const loadAssetsAsync = async () => {
      await Asset.loadAsync(require("./moon.png"));
      await Asset.loadAsync(require("./normal.png"));

      const moonTexture = await Asset.fromModule(require("./moon.png")).downloadAsync();
      const normalTexture = await Asset.fromModule(require("./normal.png")).downloadAsync();

      const geometry = new SphereGeometry(3, 32, 32);
      const material = new MeshStandardMaterial({
        map: new TextureLoader().load(moonTexture.uri),
        normalMap: new TextureLoader().load(normalTexture.uri),
      });

      moon.current = new Mesh(geometry, material);
      scene.current.add(moon.current);
    };

    loadAssetsAsync();
  }, []);

  const onContextCreate = async (gl) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

    scene.current = new Scene();
    camera.current = new PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.current.position.z = 10;

    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);

    const render = () => {
      requestAnimationFrame(render);

      if (moon.current) {
        moon.current.rotation.y += 0.01;
      }

      renderer.render(scene.current, camera.current);
      gl.endFrameEXP();
    };

    render();
  };

  return (
    <View style={{ flex: 1 }}>
      <GLView
        ref={glViewRef}
        onContextCreate={onContextCreate}
        style={{ flex: 1 }}
      />
      <StatusBar style="auto" />
    </View>
  );
};

export default App;
*/