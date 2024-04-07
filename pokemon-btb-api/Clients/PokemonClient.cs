using PokeApiNet;
using pokemon_btb_api.Controllers;
using System.Text.Json;

namespace pokemon_btb_api.Clients {
    public interface IPokemonClient
    {
        Task<Pokemon> GetPokemonByID(int id);
        Task<List<Pokemon>> GetPokemonByQuery(string query);
        Task<bool> GetAllPossiblePokemon();
    }

    public class PokemonClient: IPokemonClient {
        private readonly PokeApiClient pokemonClient;
        private readonly ILogger<PokemonClient> logger;

        private List<string> globalPokemon;
        const int CURRENT_POKEMON_LIMIT = 1302;
        public PokemonClient(PokeApiClient pokemonClient, ILogger<PokemonClient> logger)
        {
            this.logger = logger;
            this.pokemonClient = pokemonClient;

            globalPokemon = new List<string>();
        }

        public async Task<Pokemon> GetPokemonByID(int id)
        {
            Pokemon requestedMon = await pokemonClient.GetResourceAsync<Pokemon>(id);

            return requestedMon;
        }

        public async Task<List<Pokemon>> GetPokemonByQuery(string query)
        {
            var pokemonList = new List<Pokemon>();

            var toGet = globalPokemon.FindAll(element => element.Contains(query.ToLower()));

            foreach (var item in toGet)
            {
                // no task list
                Pokemon result = await pokemonClient.GetResourceAsync<Pokemon>(item);

                logger.LogInformation("Pokemon " + result.Name + " recieved, " +
                    "Item " + toGet.IndexOf(item) + " Out of " + (toGet.Count + 1));

                pokemonList.Add(result);
            }

            // TO DO: Return sorted list of results. Results that contain the first part
            // of a substring should appear first in the list, in descending order of
            // substring start position. (IE--Bulbasaur, then Abuela, etc)

            return pokemonList;
        }

        public async Task<bool> GetAllPossiblePokemon()
        {
            var fileName = "pokemon.json";

            logger.LogInformation("Getting named resources for PokeAPI");

            try
            {
                if (File.Exists("Data/" + fileName))
                {
                    logger.LogInformation("JSON exists: skipping PokeAPI call and deserializing");

                    string pokemonString = File.ReadAllText("Data/" + fileName);
                    globalPokemon = JsonSerializer.Deserialize<List<string>>(pokemonString) ?? new List<string>();

                    if (globalPokemon.Count == 0 || globalPokemon.Count != CURRENT_POKEMON_LIMIT)
                    {
                        logger.LogError("The JSON was empty or incomplete. Try to delete the file and then try again.");
                        return false;
                    }

                    return true;
                } 
                else
                {
                    await foreach (var item in pokemonClient.GetAllNamedResourcesAsync<Pokemon>())
                    {
                        globalPokemon.Add(item.Name);
                    }

                    var options = new JsonSerializerOptions { WriteIndented = true };
                    await using FileStream createStream = File.Create(fileName);
                    await JsonSerializer.SerializeAsync(createStream, globalPokemon, options);
                }
            }
            catch (Exception ex)
            {
                logger.LogError("Something happened during setup!", ex.Message);
                return false;
            }
            
            logger.LogInformation("Successfully received resources from PokeAPI");

            return true;
        }
    }
}
