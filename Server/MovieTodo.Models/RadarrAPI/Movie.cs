namespace MovieTodo.Entities.RadarrAPI;

public record class Image(
    string CoverType,
    string Url,
    string RemoteUrl
);

public record class Ratings(
    int Votes,
    decimal Value
);

public record class Collection(
    string Name,
    int TmdbId,
    List<Image> Images 
);
    

public record class Movie(
    long Id,
    string Title,
    string SortTitle,
    long SizeOnDisk,
    string Overview,
    string InCinemas,
    string PhysicalRelease,
    List<Image> Images,
    string Website,
    int Year,
    bool HasFile,
    string YouTubeTrailerId,
    string Studio,
    string Path,
    string RootFolderPath,
    int QualityProfileId,
    bool Monitored,
    string MinimumAvailability,
    bool IsAvailable,
    string FolderName,
    int Runtime,
    string CleanTitle,
    string ImdbId,
    int TmdbId,
    string TitleSlug,
    string Certification,
    List<string> Genres,
    List<int> Tags,
    string Added,
    Ratings Ratings,
    Collection Collection,
    string Status
);
