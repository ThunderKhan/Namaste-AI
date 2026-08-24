"use client";

import { useState, useMemo } from "react";
import { seasonsData, Episode } from "@/data/notesData";
import { SeasonTabs } from "./SeasonTabs";
import { EpisodeCard } from "./EpisodeCard";
import { NotesViewerModal } from "./NotesViewerModal";
import { NotesFilter } from "./NotesFilter";
import { SeasonBanner } from "./SeasonBanner";
import { NotesHero } from "./NotesHero";
import { FiSearch } from "react-icons/fi";

const Notes = () => {
  const [selectedSeasonId, setSelectedSeasonId] = useState<string>("season-1");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("All");

  const [viewerEpisode, setViewerEpisode] = useState<Episode | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const selectedSeason = useMemo(() => {
    return seasonsData.find(season => season.id === selectedSeasonId) || seasonsData[0];
  }, [selectedSeasonId]);

  const seasonTopics = useMemo(() => {
    const topicsSet = new Set<string>();
    selectedSeason.episodes.forEach(ep => {
      ep.topics.forEach(t => topicsSet.add(t));
    });
    return ["All", ...Array.from(topicsSet)];
  }, [selectedSeason]);

  const filteredEpisodes = useMemo(() => {
    return selectedSeason.episodes.filter(episode => {
      const matchesSearch =
        searchQuery === "" ||
        episode.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        episode.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        episode.topics.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesTopic = selectedTopic === "All" || episode.topics.includes(selectedTopic);

      return matchesSearch && matchesTopic;
    });
  }, [selectedSeason, searchQuery, selectedTopic]);

  const handleOpenEpisode = (episode: Episode) => {
    if (!episode.isAvailable || episode.pages.length === 0) return;
    setViewerEpisode(episode);
    setIsViewerOpen(true);
  };

  const handleCloseViewer = () => {
    setIsViewerOpen(false);
    setViewerEpisode(null);
  };

  return (
    <div className="relative min-h-screen bg-body py-10 sm:py-16">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-1/3 h-96 w-96 rounded-full bg-primary/6 blur-[140px]" />
        <div className="absolute top-1/2 right-10 h-96 w-96 rounded-full bg-secondary/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-8">
        <NotesHero />

        <div className="mt-12 flex flex-col gap-6">
          <SeasonTabs
            seasons={seasonsData}
            selectedSeasonId={selectedSeasonId}
            onSelectSeason={seasonId => {
              setSelectedSeasonId(seasonId);
              setSelectedTopic("All");
            }}
          />

          <NotesFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedTopic={selectedTopic}
            onTopicChange={setSelectedTopic}
            seasonTopics={seasonTopics}
          />
        </div>

        <SeasonBanner season={selectedSeason} episodesCount={filteredEpisodes.length} />

        <div className="mt-8">
          {filteredEpisodes.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredEpisodes.map((episode, idx) => (
                <EpisodeCard
                  key={episode.id}
                  episode={episode}
                  seasonNumber={selectedSeason.seasonNumber}
                  onOpenEpisode={handleOpenEpisode}
                  index={idx}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-border py-16 text-center">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-surface text-text-muted shadow-md">
                <FiSearch size={22} className="text-primary" />
              </div>
              <h3 className="mt-4 text-base font-bold text-text">No episodes found</h3>
              <p className="mt-1 text-xs text-text-muted max-w-sm">
                No notes matched your search query &quot;{searchQuery}&quot; in Season{" "}
                {selectedSeason.seasonNumber}.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedTopic("All");
                }}
                className="mt-4 inline-flex items-center gap-1.5 rounded-xl bg-surface-hover px-4 py-2 text-xs font-semibold text-primary hover:bg-hover transition-colors cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      <NotesViewerModal
        episode={viewerEpisode}
        season={selectedSeason}
        isOpen={isViewerOpen}
        onClose={handleCloseViewer}
        onSelectEpisode={newEpisode => setViewerEpisode(newEpisode)}
      />
    </div>
  );
};

export default Notes;
