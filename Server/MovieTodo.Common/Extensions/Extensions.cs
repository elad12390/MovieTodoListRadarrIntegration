using System.Globalization;
using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Newtonsoft.Json;

namespace MovieTodo.Common.Extensions;

public static class Extensions
{
    public static void Detach<T>(this T t, DbContext context) where T : class =>
        context.Entry(t).State = EntityState.Detached;
    
    
    ////////////////////  Byte images  ////////////////////
    public static string ToStringImage(this byte[] byteImage, string imageType)
    {
        return "data:" + imageType + ";base64," + Convert.ToBase64String(byteImage);
    }

    ////////////////////  int  ////////////////////
    public static bool IsValidID(this int id)
    {
        return id > 0;
    }

    public static int InvalidID(this int id)
    {
        return 0;
    }

    ////////////////////  long  ////////////////////
    public static bool IsValidID(this long id)
    {
        return id > 0;
    }

    public static int InvalidID(this long id)
    {
        return 0;
    }

    ////////////////////  long?  ////////////////////
    public static bool IsValidID(this long? id)
    {
        return id is > 0;
    }
    
    
    ////////////////////    HttpClient /////////////
    public static async Task<T?> GetJsonAsync<T>(this HttpClient httpClient, string url, CancellationToken cancellationToken = default) where T:class
    {
        var response = await httpClient.GetAsync(url, cancellationToken);
        response.EnsureSuccessStatusCode();
        var json = await response.Content.ReadAsStringAsync(cancellationToken);
        return JsonConvert.DeserializeObject<T>(json);
    }  
    
    
    
    ////////////////////  IMemoryCache  ////////////////////
    
    
    public static T UseCachedValue<T>(this IMemoryCache memoryCache, string key, Func<T> fetch, MemoryCacheEntryOptions? options = null)
    {
        if (!memoryCache.TryGetValue(key, out T cacheValue))
        {
            cacheValue = fetch();
            memoryCache.Set(key, cacheValue, options);            
        }
        
        return cacheValue;
    }
    
    
    public static void UseCachedValue<T>(this IMemoryCache memoryCache, string key, Action<T> action, Func<T> fetch, MemoryCacheEntryOptions? options = null)
    {
        if (!memoryCache.TryGetValue(key, out T cacheValue))
        {
            cacheValue = fetch();
            memoryCache.Set(key, cacheValue, options);            
        }
        
        action(cacheValue);
    }
    
    public static S UseCachedValue<T, S>(this IMemoryCache memoryCache, string key, Func<T, S> action, Func<T> fetch, MemoryCacheEntryOptions? options = null)
    {
        if (!memoryCache.TryGetValue(key, out T cacheValue))
        {
            cacheValue = fetch();
            memoryCache.Set(key, cacheValue, options);            
        }
        
        return action(cacheValue);
    }

    ////////////////////  string  ////////////////////
    public static bool HasNoValue(this string str)
    {
        return string.IsNullOrWhiteSpace(str);
    }

    public static bool HasValue(this string str)
    {
        return !string.IsNullOrWhiteSpace(str);
    }

    //public static bool IsNullOrWhiteSpace(this string str)
    //{
    //	return string.IsNullOrWhiteSpace(str);
    //}

    public static int? ToNullableInt(this string str, int? iDefaultValue = null)
    {
        return int.TryParse(str, out var iRetVal) ? iRetVal : iDefaultValue;
    }

    public static int ToInt(this string str, bool forceConversion, int iDefaultValue = int.MinValue)
    {
        int iRetVal;
        if (forceConversion)
        {
            iRetVal = int.Parse(str);
        }
        else
        {
            if (int.TryParse(str, out iRetVal) == false)
                iRetVal = iDefaultValue;
        }

        return iRetVal;
    }

    public static int ToInt(this string str, int iDefaultValue = int.MinValue)
    {
        if (int.TryParse(str, out var iRetVal) == false)
            iRetVal = iDefaultValue;

        return iRetVal;
    }

    public static long ToInt64(this string str, long iDefaultValue = long.MinValue)
    {
        if (long.TryParse(str, out var iRetVal) == false)
            iRetVal = iDefaultValue;

        return iRetVal;
    }

    public static float ToFloat(this string str, float fDefaultValue = float.MinValue)
    {
        if (float.TryParse(str, out var fRetVal) == false)
            fRetVal = fDefaultValue;

        return fRetVal;
    }

    public static double ToDouble(this string str, double dblDefaultValue = double.MinValue)
    {
        if (double.TryParse(str, out var dblRetVal) == false)
            dblRetVal = dblDefaultValue;

        return dblRetVal;
    }

    public static decimal ToDecimal(this string str, bool forceConversion, decimal decDefaultValue = decimal.MinValue)
    {
        decimal decRetVal;
        if (forceConversion)
        {
            decRetVal = decimal.Parse(str);
        }
        else
        {
            if (decimal.TryParse(str, out decRetVal) == false)
                decRetVal = decDefaultValue;
        }

        return decRetVal;
    }

    public static decimal ToDecimal(this string str, decimal decDefaultValue = decimal.MinValue)
    {
        if (decimal.TryParse(str, out var decRetVal) == false)
            decRetVal = decDefaultValue;

        return decRetVal;
    }

    public static bool ToBool(this string str, bool bDefaultValue = false)
    {
        if (bool.TryParse(str, out var bRetVal) == false)
            bRetVal = bDefaultValue;

        return bRetVal;
    }

    public static DateTime ToDateTime(this string str, string format, DateTime dtDefaultValue = default)
    {
        if (DateTime.TryParseExact(str, format, null, DateTimeStyles.AllowWhiteSpaces, out var dtRetVal) == false)
            dtRetVal = dtDefaultValue;

        return dtRetVal;
    }

    public static bool Contains(this string str, string strValue, bool bIgnoreCase)
    {
        var bRetVal = false;
        if (string.IsNullOrWhiteSpace(str) || string.IsNullOrWhiteSpace(strValue))
            bRetVal = false;
        else if (bIgnoreCase)
            bRetVal = Thread.CurrentThread.CurrentCulture.CompareInfo.IndexOf(str, strValue, System.Globalization.CompareOptions.IgnoreCase) >= 0;
        else
            bRetVal = str.Contains(strValue);

        return bRetVal;
    }

    public static string ToDigitsOnly(this string str)
    {
        return string.IsNullOrEmpty(str) ? str : Regex.Replace(str, @"[^\d]", "");
    }

    public static bool IsNumeric(this string str)
    {
        return !string.IsNullOrEmpty(str) && int.TryParse(str, out _);
    }

    ////////////////////  DateTime  ////////////////////
    public static DateTime BeginOfDay(this DateTime dt)
    {
        return dt.BeginOfMonth().AddDays(dt.Day - 1);
    }

    public static DateTime EndOfDay(this DateTime dt)
    {
        return dt.BeginOfMonth().AddDays(dt.Day).AddMilliseconds(-1);
    }

    public static DateTime BeginOfMonth(this DateTime dt)
    {
        return DateTime.MinValue.AddYears(dt.Year - DateTime.MinValue.Year).AddMonths(dt.Month - 1);
    }

    public static DateTime EndOfMonth(this DateTime dt)
    {
        return dt.BeginOfMonth().AddMonths(1).AddMilliseconds(-1);
    }

    public static DateTime BeginOfYear(this DateTime dt)
    {
        return DateTime.MinValue.AddYears(dt.Year - DateTime.MinValue.Year);
    }

    public static DateTime EndOfYear(this DateTime dt)
    {
        return dt.BeginOfMonth().AddMilliseconds(-1);
    }

    public static bool IsSameDay(this DateTime dt, DateTime dtCompare)
    {
        return dt.Year == dtCompare.Year && dt.Month == dtCompare.Month && dt.Day == dtCompare.Day;
    }

    public static bool IsSameMonth(this DateTime dt, DateTime dtCompare)
    {
        return dt.Year == dtCompare.Year && dt.Month == dtCompare.Month;
    }

    public static bool IsSameYear(this DateTime dt, DateTime dtCompare)
    {
        return dt.Year == dtCompare.Year;
    }

    ////////////////////  Guid  ////////////////////
    public static string ToStringFormatted(this Guid guid)
    {
        return guid.ToString().Replace("-", "");
    }

    ////////////////////  Nullable  ////////////////////
    public static int ToInt(this int? number)
    {
        return number ?? 0;
    }

    public static int ToInt(this int? number, int iDefaultValue)
    {
        return number ?? iDefaultValue;
    }


    ////////////////////  Nullable  ////////////////////
    public static int ToInt(this decimal? @int, int iDefaultValue = 0)
    {
        return (int)(@int ?? iDefaultValue);
    }

    public static decimal ToDecimal(this decimal? dec, decimal decDefaultValue = 0)
    {
        return dec ?? decDefaultValue;
    }


    ////////////////////  IList<T>  ////////////////////
    public static IList<T> ShallowClone<T>(this IList<T> listToClone)
    {
        return new List<T>(listToClone);
    }

    public static IList<T> Clone<T>(this IList<T> listToClone) where T : ICloneable
    {
        return listToClone.Select(item => (T)item.Clone()).ToList();
    }

    public static List<T> Clone<T>(this List<T> listToClone) where T : ICloneable
    {
        return listToClone.Select(item => (T)item.Clone()).ToList();
    }

    public static bool HasValue<T>(this IList<T> list)
    {
        return list is { Count: > 0 };
    }

    public static bool HasValue<T>(this List<T>? list)
    {
        return list is { Count: > 0 };
    }

    public static bool IsNullOrEmpty<T>(this IList<T>? list)
    {
        return list is null || list.Count == 0;
    }


    ////////////////////  ICollection<T>  ////////////////////
    public static ICollection<T> Clone<T>(this ICollection<T> colToClone) where T : ICloneable
    {
        return colToClone.Select(item => (T)item.Clone()).ToList();
    }

    public static bool HasValue<T>(this ICollection<T>? col)
    {
        return (col != null && col.Count > 0);
    }

    public static bool IsNullOrEmpty<T>(this ICollection<T>? col)
    {
        return (col != null || col.Count == 0);
    }

    public static void ForEach<T>(this ICollection<T> col, Action<T> action)
    {
        foreach (var item in col)
        {
            action(item);
        }
    }

    ////////////////////  IEnumerable<T>  ////////////////////
    public static IEnumerable<T> Clone<T>(this IEnumerable<T> enumerationToClone) where T : ICloneable
    {
        return enumerationToClone.Select(item => (T)item.Clone()).ToList();
    }

    public static bool HasValue<T>(this IEnumerable<T>? enumeration)
    {
        return enumeration != null && enumeration.Any();
    }

    public static bool IsNullOrEmpty<T>(this IEnumerable<T>? enumeration)
    {
        return enumeration != null || !enumeration.Any();
    }

    public static void ForEach<T>(this IEnumerable<T> enumeration, Action<T> action)
    {
        foreach (var item in enumeration)
        {
            action(item);
        }
    }
}