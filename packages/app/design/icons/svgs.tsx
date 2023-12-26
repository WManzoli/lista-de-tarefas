import React from 'react';
import { Svg, Path } from 'react-native-svg';

export const Check = ({ color }: { color: string }) => (
    <Svg x="0px" y="0px" width="30" height="30" fill={color} viewBox="0 0 24 24">
        <Path d="M 19.980469 5.9902344 A 1.0001 1.0001 0 0 0 19.292969 6.2929688 L 9 16.585938 L 5.7070312 13.292969 A 1.0001 1.0001 0 1 0 4.2929688 14.707031 L 8.2929688 18.707031 A 1.0001 1.0001 0 0 0 9.7070312 18.707031 L 20.707031 7.7070312 A 1.0001 1.0001 0 0 0 19.980469 5.9902344 z"></Path>
    </Svg>
);

export const Plus = ({ color }: { color: string }) => (
    <Svg width="64" height="32" viewBox="0 0 24 24">
        <Path id="Vector" d="M6 12H12M12 12H18M12 12V18M12 12V6" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </Svg>
);

export const Times = ({ color }: { color: string }) => (
    <Svg x="0px" y="0px" width="25" height="25" viewBox="0 0 48 48" fill={color}>
        <Path d="M 39.486328 6.9785156 A 1.50015 1.50015 0 0 0 38.439453 7.4394531 L 24 21.878906 L 9.5605469 7.4394531 A 1.50015 1.50015 0 0 0 8.484375 6.984375 A 1.50015 1.50015 0 0 0 7.4394531 9.5605469 L 21.878906 24 L 7.4394531 38.439453 A 1.50015 1.50015 0 1 0 9.5605469 40.560547 L 24 26.121094 L 38.439453 40.560547 A 1.50015 1.50015 0 1 0 40.560547 38.439453 L 26.121094 24 L 40.560547 9.5605469 A 1.50015 1.50015 0 0 0 39.486328 6.9785156 z"></Path>
    </Svg>
);
