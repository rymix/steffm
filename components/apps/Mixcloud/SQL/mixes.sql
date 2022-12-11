SELECT
mixes.category,
mixes.coverArtDate,
mixes.coverArtLarge,
mixes.coverArtSmall,
mixes.duration,
mixes.fileName,
mixes.listOrder,
mixes.mcKey as mixcloudKey,
mixes.name,
mixes.notes,
mixes.releaseDate,
mixes.shortName,
tracklists.artistName,
tracklists.coverArtDate,
tracklists.coverArtLarge,
tracklists.coverArtSmall,
tracklists.publisher,
tracklists.remixArtistName,
tracklists.sectionNumber,
tracklists.startTime,
tracklists.trackName

FROM mixes

INNER JOIN tracklists

ON mixes.mcKey = tracklists.mcKey
