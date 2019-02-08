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

# some data structure, probably a list, of tiles
#   - these tiles will be some tuple with an x, y, a letter value, and a hidden boolean

# Functions:
# initiate list of tiles for the Game !
# on click, will be passed the value of a tile
#   - either update the state of the first
#   - or if its the second tile, update the state to show it then check the match
# Reset the state upon the reset button being clicked --- this is literally new

# TODO: fix init_tiles so that it actually creates a map with all these bad boys
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
  Enum.each(0..15, fn(x) ->
    Map.put(tile_list, x, %{letter: List.pop_at(pool, 0),
    i: rem(x, 4), # remainder should give the correct column
    j: div(x, 4), # integer division should give the correct row
    hidden: true # all tiles start hidden until clicked
    index: x} # index so the state can be updated more easily
  end)
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

  end
  # first has already been clicked so we need to check if this is a match
    game
    |> Map.put(:tiles, new_tiles)
    |> Map.put(:clicks, clicks)
    |> Map.put(:second, tile)
  else

  end
end

#update a tile to be either hidden or not with hide boolean
def update_tiles(tile_list, tile) do
  i = tile.index

  key =
    tile_list
    |> Enum.find(fn {key, val} -> val.index == i)
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
  |> Map.put(clicks: clicks)
  |> Map.put(second: tile)
end

# if not a match the tiles need to be re-hidden and the clicks forgotten
def not_match(game) do
  game
  |> hide_tile(game.first, game.second)
  |> reset_clicked
end

end
