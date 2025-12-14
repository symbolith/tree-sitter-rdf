import io.github.treesitter.jtreesitter.Language;
import io.github.treesitter.jtreesitter.rdf11ntriples.TreeSitterRdf11Ntriples;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertDoesNotThrow;

public class TreeSitterRdf11NtriplesTest {
    @Test
    public void testCanLoadLanguage() {
        assertDoesNotThrow(() -> new Language(TreeSitterRdf11Ntriples.language()));
    }
}
