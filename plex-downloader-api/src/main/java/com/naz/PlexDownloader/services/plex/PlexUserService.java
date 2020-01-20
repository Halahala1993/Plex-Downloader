package com.naz.PlexDownloader.services.plex;

import com.naz.PlexDownloader.models.plex.PlexUser;
import org.springframework.stereotype.Service;

import java.util.List;

public interface PlexUserService {

    List<PlexUser> retrieveUsers(final String authToken);
}
