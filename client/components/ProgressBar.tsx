import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface ProgressBarProps {
    progress: number;
    themeColor?: string;
    totalBlocks?: number;
}

export const ProgressBar = ({
    progress,
    themeColor = '#00FFFF',
    totalBlocks = 20
}: ProgressBarProps) => {

    // Ensure progress is between 0 and 100
    const clampedProgress = Math.min(Math.max(progress, 0), 100);
    const filledBlocks = Math.floor((clampedProgress / 100) * totalBlocks);
    const blocks = [];

    // Calculate width dynamically to leave space for gaps
    // e.g. 20 blocks -> 100/20 = 5%. Use 4% to leave 1% gap distributed
    const blockWidthPerc = (100 / totalBlocks) - 1;

    for (let i = 0; i < totalBlocks; i++) {
        blocks.push(
            <View
                key={i}
                style={[
                    styles.block,
                    {
                        backgroundColor: i < filledBlocks ? themeColor : '#1a1a1a',
                        width: `${blockWidthPerc}%`
                    }
                ]}
            />
        );
    }

    return (
        <View style={styles.progressWrapper}>
            <View style={[styles.blocksContainer, { borderColor: themeColor }]}>
                {blocks}
            </View>
            <Text style={[styles.percentText, { color: themeColor, textShadowColor: themeColor }]}>
                LOADING: {Math.floor(clampedProgress)}%
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    progressWrapper: {
        width: '100%',
    },
    blocksContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 20,
        marginBottom: 8,
    },
    block: {
        height: '100%',
        borderRadius: 1,
    },
    percentText: {
        fontFamily: 'VT323_400Regular',
        fontSize: 18,
        textAlign: 'right',
        textShadowRadius: 4,
    }
});
