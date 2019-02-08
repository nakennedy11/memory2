defmodule Memory2.Game do

# game state
# - list of all tile-tuples in the game
# - # of clicks
# - first clicked value
# - second clicked value

def new do
  %{
    tiles: init_tiles(),
    clicks: 0,
    first: %{},
    second: %{}
  }
end

# initiate the list of tiles for memory game with letter, i, j, and hidden bool
def init_tiles() do
  # create a list of letters to be made into tiles, init empty list to add to
  pool = Enum.shuffle(["a", "b", "c", "d", "e", "f", "g", "h", "a", "b", "c",
                        "d", "e", "f", "g", "h"])
  tile_list = %{}
  # go through all 16 letters in the pool and create tiles with them
  # letter is the first random letter from pool, i and j are palcement in the
  # grid based on the modular division
  # hidden is to determine whether or not the letter for this tile is revealed

    tile_list
    |> Map.put(0, %{letter: Enum.at(pool, 0),
    i: 0, # remainder should give the correct column
    j: 0, # integer division should give the correct row
    hidden: true, # all tiles start hidden until clicked
    index: 0})
    |> Map.put(1, %{letter: Enum.at(pool, 1),
    i: 1,
    j: 0,
    hidden: true,
    index: 1})
    |> Map.put(2, %{letter: Enum.at(pool, 2),
    i: 2,
    j: 0,
    hidden: true,
    index: 2})
    |> Map.put(3, %{letter: Enum.at(pool, 3),
    i: 3,
    j: 0,
    hidden: true,
    index: 3})
    |> Map.put(4, %{letter: Enum.at(pool, 4),
    i: 0,
    j: 1,
    hidden: true,
    index: 4})
    |> Map.put(5, %{letter: Enum.at(pool, 5),
    i: 1,
    j: 1,
    hidden: true,
    index: 5})
    |> Map.put(6, %{letter: Enum.at(pool, 6),
    i: 2,
    j: 1,
    hidden: true,
    index: 6})
    |> Map.put(7, %{letter: Enum.at(pool, 7),
    i: 3,
    j: 1,
    hidden: true,
    index: 7})
    |> Map.put(8, %{letter: Enum.at(pool, 8),
    i: 0,
    j: 2,
    hidden: true,
    index: 8})
    |> Map.put(9, %{letter: Enum.at(pool, 9),
    i: 1,
    j: 2,
    hidden: true,
    index: 9})
    |> Map.put(10, %{letter: Enum.at(pool, 10),
    i: 2,
    j: 2,
    hidden: true,
    index: 10})
    |> Map.put(11, %{letter: Enum.at(pool, 11),
    i: 3,
    j: 2,
    hidden: true,
    index: 11})
    |> Map.put(12, %{letter: Enum.at(pool, 12),
    i: 0,
    j: 3,
    hidden: true,
    index: 12})
    |> Map.put(13, %{letter: Enum.at(pool, 13),
    i: 1,
    j: 3,
    hidden: true,
    index: 13})
    |> Map.put(14, %{letter: Enum.at(pool, 14),
    i: 2,
    j: 3,
    hidden: true,
    index: 14})
    |> Map.put(15, %{letter: Enum.at(pool, 15),
    i: 3,
    j: 3,
    hidden: true,
    index: 15})
end

# function to handle a letter being clicked
# either update the state to remember what has been clicked
# also need to update the click count
def on_click(tile, game) do
  # check if first || second is empty
  # converts to a list and checks length to see if first has been instantiated
  first_clicked = Tuple.to_list(game.first).length == 0
  second_clicked = Tuple.to_list(game.second).length == 0
  i = tile.index # get the index to replace the tile

  # get the list of tiles and update it not to be hidden
  tile
  |> Map.put(:hidden, false) # make the tile letter visible

  tile_list = game.tiles
  new_tiles = update_tiles(tile_list, tile)

  clicks = game.clicks + 1

  # first has not been clicked on yet
  if !first_clicked do
    game
    |> Map.put(:tiles, new_tiles)
    |> Map.put(:clicks, clicks)
    |> Map.put(:first, tile)



else
    game
    |> Map.put(:tiles, new_tiles)
    |> Map.put(:clicks, clicks)
    |> Map.put(:second, tile)
  end
end

#update a tile to be either hidden or not with hide boolean
def update_tiles(tile_list, tile) do
  i = tile.index

  key =
    tile_list
    |> Enum.find(fn {key, val} -> val.index == i end)
    |> elem(0)

    # update the list with new tile
    Map.put(tile_list, key, tile)
end

# update a tile to be hidden again in the event 2 clicked but not a match
def hide_tile(game, tile1, tile2) do
  tile1
  |> Map.put(:hidden, true)

  tile2
  |> Map.put(:hidden, true)

  tiles = game.tiles
  new_tiles =
    tiles
    |> update_tiles(tile1)
    |> update_tiles(tile2)

  Map.put(game, :tiles, new_tiles)
end

# after 2 clicks have happened, need to forget what has been clicked
def reset_clicked(game) do
  game
  |> Map.put(:first, %{})
  |> Map.put(:second, %{})
end

# if not a match the tiles need to be re-hidden and the clicks forgotten
def not_match(game) do
  game
  |> hide_tile(game.first, game.second)
  |> reset_clicked
end

def client_view(game) do
  %{
      tiles: game.tiles,
      clicks: game.clicks,
      first: game.first,
      second: game.second
  }
end

end
