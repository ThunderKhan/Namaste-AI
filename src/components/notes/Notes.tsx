"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import {
  seasonsData,
  Episode,
  NotePage,
  getEpisodeBySlug,
  getPageBySlug,
  getPageUrl,
  getEpisodeUrl,
  getSeasonUrl,
} from "@/data/notesData";
import { SeasonTabs } from "./SeasonTabs";
import { EpisodeCard } from "./EpisodeCard";
import { NotesViewerModal } from "./NotesViewerModal";
import { NotesFilter } from "./NotesFilter";
import { SeasonBanner } from "./SeasonBanner";
import { NotesHero } from "./NotesHero";
import { FiSearch } from "react-icons/fi";

interface NotesProps {
  initialSeasonSlug?: string;
  initialEpisodeSlug?: string;
  initialPageSlug?: string;
}

const Notes = ({ initialSeasonSlug, initialEpisodeSlug, initialPageSlug }: NotesProps) => {
  const initialData = useMemo(() => {
    if (initialSeasonSlug && initialEpisodeSlug) {
      if (initialPageSlug) {
        const pageResult = getPageBySlug(initialSeasonSlug, initialEpisodeSlug, initialPageSlug);
        if (pageResult && pageResult.episode.isAvailable && pageResult.episode.pages.length > 0) {
          return {
            episode: pageResult.episode,
            pageIndex: pageResult.pageIndex,
          };
        }
      }
      const result = getEpisodeBySlug(initialSeasonSlug, initialEpisodeSlug);
      if (result && result.episode.isAvailable && result.episode.pages.length > 0) {
        return {
          episode: result.episode,
          pageIndex: 0,
        };
      }
    }
    return { episode: null, pageIndex: 0 };
  }, [initialSeasonSlug, initialEpisodeSlug, initialPageSlug]);

  const [selectedSeasonId, setSelectedSeasonId] = useState<string>(initialSeasonSlug || "season-1");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("All");

  const [viewerEpisode, setViewerEpisode] = useState<Episode | null>(initialData.episode);
  const [viewerPageIndex, setViewerPageIndex] = useState<number>(initialData.pageIndex);
  const [isViewerOpen, setIsViewerOpen] = useState<boolean>(Boolean(initialData.episode));

  const selectedSeason = useMemo(() => {
    return seasonsData.find(season => season.id === selectedSeasonId) || seasonsData[0];
  }, [selectedSeasonId]);

  useEffect(() => {
    if (initialSeasonSlug) {
      setSelectedSeasonId(initialSeasonSlug);
    }
    if (initialSeasonSlug && initialEpisodeSlug) {
      if (initialPageSlug) {
        const pageResult = getPageBySlug(initialSeasonSlug, initialEpisodeSlug, initialPageSlug);
        if (pageResult && pageResult.episode.isAvailable && pageResult.episode.pages.length > 0) {
          setViewerEpisode(pageResult.episode);
          setViewerPageIndex(pageResult.pageIndex);
          setIsViewerOpen(true);
          return;
        }
      }
      const result = getEpisodeBySlug(initialSeasonSlug, initialEpisodeSlug);
      if (result && result.episode.isAvailable && result.episode.pages.length > 0) {
        setViewerEpisode(result.episode);
        setViewerPageIndex(0);
        setIsViewerOpen(true);
      }
    }
  }, [initialSeasonSlug, initialEpisodeSlug, initialPageSlug]);

  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname;
      const segments = pathname.split("/").filter(Boolean); // ['notes', 'season-1', 'episode-1-...', 'page-1-...']
      if (segments[0] === "notes") {
        const seasonSlug = segments[1] || "season-1";
        const episodeSlug = segments[2];
        const pageSlug = segments[3];

        setSelectedSeasonId(seasonSlug);

        if (episodeSlug && pageSlug) {
          const pageResult = getPageBySlug(seasonSlug, episodeSlug, pageSlug);
          if (pageResult && pageResult.episode.isAvailable && pageResult.episode.pages.length > 0) {
            setViewerEpisode(pageResult.episode);
            setViewerPageIndex(pageResult.pageIndex);
            setIsViewerOpen(true);
            return;
          }
        } else if (episodeSlug) {
          const result = getEpisodeBySlug(seasonSlug, episodeSlug);
          if (result && result.episode.isAvailable && result.episode.pages.length > 0) {
            setViewerEpisode(result.episode);
            setViewerPageIndex(0);
            setIsViewerOpen(true);
            return;
          }
        }

        setIsViewerOpen(false);
        setViewerEpisode(null);
        setViewerPageIndex(0);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

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

  const handleSelectSeason = useCallback((seasonId: string) => {
    setSelectedSeasonId(seasonId);
    setSelectedTopic("All");
    const url = getSeasonUrl(seasonId);
    window.history.pushState({ seasonId }, "", url);
  }, []);

  const handleOpenEpisode = useCallback(
    (episode: Episode) => {
      if (!episode.isAvailable || episode.pages.length === 0) return;
      const targetPage = episode.pages[0];
      setViewerEpisode(episode);
      setViewerPageIndex(0);
      setIsViewerOpen(true);
      const url = targetPage
        ? getPageUrl(selectedSeasonId, episode, targetPage)
        : getEpisodeUrl(selectedSeasonId, episode);
      window.history.pushState(
        { seasonId: selectedSeasonId, episodeId: episode.id, pageNumber: 1 },
        "",
        url
      );
    },
    [selectedSeasonId]
  );

  const handlePageChange = useCallback(
    (pageIndex: number, page: NotePage) => {
      if (!viewerEpisode) return;
      setViewerPageIndex(pageIndex);
      const url = getPageUrl(selectedSeasonId, viewerEpisode, page);
      window.history.replaceState(
        { seasonId: selectedSeasonId, episodeId: viewerEpisode.id, pageNumber: page.pageNumber },
        "",
        url
      );
    },
    [selectedSeasonId, viewerEpisode]
  );

  const handleCloseViewer = useCallback(() => {
    setIsViewerOpen(false);
    setViewerEpisode(null);
    setViewerPageIndex(0);
    const url = getSeasonUrl(selectedSeasonId);
    window.history.pushState({ seasonId: selectedSeasonId }, "", url);
  }, [selectedSeasonId]);

  const handleSelectEpisodeInViewer = useCallback(
    (episode: Episode) => {
      setViewerEpisode(episode);
      setViewerPageIndex(0);
      const targetPage = episode.pages[0];
      const url = targetPage
        ? getPageUrl(selectedSeasonId, episode, targetPage)
        : getEpisodeUrl(selectedSeasonId, episode);
      window.history.replaceState(
        { seasonId: selectedSeasonId, episodeId: episode.id, pageNumber: 1 },
        "",
        url
      );
    },
    [selectedSeasonId]
  );

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
            onSelectSeason={handleSelectSeason}
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
                  seasonSlug={selectedSeasonId}
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
        initialPageIndex={viewerPageIndex}
        isOpen={isViewerOpen}
        onClose={handleCloseViewer}
        onSelectEpisode={handleSelectEpisodeInViewer}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Notes;
