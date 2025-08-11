import { Star, Trash2 } from 'lucide-react';
import type { FavoriteLocation } from '../hooks/useFavorites';

interface FavoritesListProps {
  favorites: FavoriteLocation[];
  onLoadFavorite: (favorite: FavoriteLocation) => void;
  onRemoveFavorite: (id: string) => void;
}

export const FavoritesList = ({ 
  favorites, 
  onLoadFavorite, 
  onRemoveFavorite 
}: FavoritesListProps) => {
  if (favorites.length === 0) {
    return (
      <div className="favorites-empty">
        <Star size={48} className="favorites-empty__icon" />
        <p>No favorite locations saved yet</p>
        <p className="text-muted">Search for a location and save it to get started</p>
      </div>
    );
  }

  return (
    <div className="favorites-grid">
      {favorites.map((favorite) => (
        <article 
          key={favorite.id}
          className="favorite-card"
        >
          <button
            onClick={() => onLoadFavorite(favorite)}
            className="favorite-card__content"
            aria-label={`Load weather for ${favorite.name}`}
          >
            <div className="favorite-card__weather">
              <div>
                <h3 className="favorite-card__name">{favorite.name}</h3>
                <time className="favorite-card__date" dateTime={favorite.savedAt}>
                  Saved: {new Date(favorite.savedAt).toLocaleDateString()}
                </time>
                {favorite.temp !== undefined && (
                  <p className="favorite-card__temp">{favorite.temp}°C</p>
                )}
              </div>
            </div>
          </button>
          
          <button
            onClick={() => onRemoveFavorite(favorite.id)}
            className="favorite-card__remove"
            aria-label={`Remove ${favorite.name} from favorites`}
          >
            <Trash2 size={16} />
          </button>
        </article>
      ))}
    </div>
  );
};
