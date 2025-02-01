import { useGLTF, VertexNormalsHelper } from '@react-three/drei';

const ModelWithHelper = () => {
  const { nodes } = useGLTF('/shirt_baked.glb');

  return (
    <>
      <mesh geometry={nodes.T_Shirt_male.geometry}>
        <meshBasicMaterial color="white" />
      </mesh>
      <VertexNormalsHelper
        mesh={nodes.T_Shirt_male}
        size={0.1} // Tamaño de las normales
        color="red" // Color de las normales
      />
    </>
  );
};

export default ModelWithHelper;