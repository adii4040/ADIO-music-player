export const songFormat = (song) => {
    return {
            ...song,
            title: song.attributes?.name,
            artistName: song.attributes?.artistName,
            songUrl: song?.attributes?.previews?.[0]?.url,
            images: {
                coverart: song.attributes?.artwork?.url,
            },
            key: song.id,
        };

}