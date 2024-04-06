using PokeApiNet;

namespace pokemon_btb_api.Clients {
    public interface IPokemonClient
    {
        Task<Pokemon> GetPokemonByID(int id);
    }

    public class PokemonClient: IPokemonClient {
        private PokeApiClient pokemonClient;

        public PokemonClient(PokeApiClient pokemonClient)
        {
            this.pokemonClient = pokemonClient;
        }

        public async Task<Pokemon> GetPokemonByID(int id)
        {
            Pokemon requestedMon = await pokemonClient.GetResourceAsync<Pokemon>(id);

            return requestedMon;
        }
    }
}
