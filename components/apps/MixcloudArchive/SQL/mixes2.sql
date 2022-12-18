SELECT
  JSON_PRETTY(
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'category', j.category,
        'coverArtDate', j.coverArtDate,
        'coverArtLarge', j.coverArtLarge,
        'coverArtSmall', j.coverArtSmall,
        'duration', j.duration,
        'fileName', j.fileName,
        'listOrder', j.listOrder,
        'mixcloudKey', REPLACE(REPLACE(j.mcKey, "/rymixxx/", ""), "/", ""),
        'name', j.name,
        'notes', j.notes,
        'releaseDate', j.releaseDate,
        'shortName', j.shortName,
        'tracks', tracks
      )
    )
  ) AS _result
FROM (
  SELECT
  m.category,
  m.coverArtDate,
  m.coverArtLarge,
  m.coverArtSmall,
  m.duration,
  m.fileName,
  m.listOrder,
  m.mcKey,
  m.name,
  m.notes,
  m.releaseDate,
  m.shortName,
    JSON_ARRAYAGG(
      JSON_OBJECT(
        'artistName', t.artistName,
        'coverArtDate', t.coverArtDate,
        'coverArtLarge', t.coverArtLarge,
        'coverArtSmall', t.coverArtSmall,
        'publisher', t.publisher,
        'remixArtistName', t.remixArtistName,
        'sectionNumber', t.sectionNumber,
        'startTime', t.startTime,
        'trackName', t.trackName
      )
    ) AS tracks
  FROM mixes m JOIN tracklists t ON m.mcKey = t.mcKey
  GROUP BY m.mcKey
) AS j;
